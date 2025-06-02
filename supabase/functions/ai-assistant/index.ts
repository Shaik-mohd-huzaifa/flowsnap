
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY')!;

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages, authToken } = await req.json();

    // Create Supabase client with user auth
    const supabase = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: `Bearer ${authToken}` } }
    });

    // Get current user
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) {
      throw new Error('Unauthorized');
    }

    console.log('Processing request for user:', user.id);

    // Define tools for the AI
    const tools = [
      {
        type: "function",
        function: {
          name: "create_note",
          description: "Create a new note with title and content",
          parameters: {
            type: "object",
            properties: {
              title: {
                type: "string",
                description: "The title of the note"
              },
              content: {
                type: "string",
                description: "The content/body of the note"
              }
            },
            required: ["title", "content"]
          }
        }
      },
      {
        type: "function",
        function: {
          name: "create_board_tile",
          description: "Create a new board tile/task",
          parameters: {
            type: "object",
            properties: {
              title: {
                type: "string",
                description: "The title of the board tile"
              },
              description: {
                type: "string",
                description: "The description of the board tile"
              },
              status: {
                type: "string",
                enum: ["todo", "in-progress", "done"],
                description: "The status of the board tile"
              },
              priority: {
                type: "string",
                enum: ["low", "medium", "high"],
                description: "The priority level of the board tile"
              }
            },
            required: ["title"]
          }
        }
      },
      {
        type: "function",
        function: {
          name: "update_board_tile_status",
          description: "Update the status of an existing board tile",
          parameters: {
            type: "object",
            properties: {
              tile_id: {
                type: "string",
                description: "The ID of the board tile to update"
              },
              status: {
                type: "string",
                enum: ["todo", "in-progress", "done"],
                description: "The new status for the board tile"
              }
            },
            required: ["tile_id", "status"]
          }
        }
      },
      {
        type: "function",
        function: {
          name: "get_board_tiles",
          description: "Get all board tiles for the user",
          parameters: {
            type: "object",
            properties: {},
            required: []
          }
        }
      },
      {
        type: "function",
        function: {
          name: "get_notes",
          description: "Get all notes for the user",
          parameters: {
            type: "object",
            properties: {},
            required: []
          }
        }
      }
    ];

    // Call OpenAI with tools
    const openAIResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: `You are a helpful AI assistant that can help users manage their notes and board tiles/tasks. You have access to tools that allow you to:
            - Create new notes
            - Create new board tiles/tasks
            - Update board tile status
            - View existing notes and board tiles
            
            When users ask you to create something, use the appropriate tool. Be conversational and helpful. Always confirm what you've done after using a tool.`
          },
          ...messages
        ],
        tools,
        tool_choice: "auto"
      }),
    });

    const openAIData = await openAIResponse.json();
    console.log('OpenAI response:', JSON.stringify(openAIData, null, 2));

    let assistantMessage = openAIData.choices[0].message;

    // Handle tool calls
    if (assistantMessage.tool_calls && assistantMessage.tool_calls.length > 0) {
      const toolResults = [];

      for (const toolCall of assistantMessage.tool_calls) {
        const { name, arguments: args } = toolCall.function;
        const parsedArgs = JSON.parse(args);
        
        console.log(`Executing tool: ${name} with args:`, parsedArgs);

        let result;
        
        try {
          switch (name) {
            case 'create_note':
              const { data: noteData, error: noteError } = await supabase
                .from('notes')
                .insert([{
                  title: parsedArgs.title,
                  content: parsedArgs.content,
                  user_id: user.id
                }])
                .select()
                .single();

              if (noteError) throw noteError;
              result = { success: true, data: noteData, message: `Note "${parsedArgs.title}" created successfully` };
              break;

            case 'create_board_tile':
              const { data: tileData, error: tileError } = await supabase
                .from('board_tiles')
                .insert([{
                  title: parsedArgs.title,
                  description: parsedArgs.description || null,
                  status: parsedArgs.status || 'todo',
                  priority: parsedArgs.priority || 'medium',
                  user_id: user.id
                }])
                .select()
                .single();

              if (tileError) throw tileError;
              result = { success: true, data: tileData, message: `Board tile "${parsedArgs.title}" created successfully` };
              break;

            case 'update_board_tile_status':
              const { data: updateData, error: updateError } = await supabase
                .from('board_tiles')
                .update({ status: parsedArgs.status })
                .eq('id', parsedArgs.tile_id)
                .eq('user_id', user.id)
                .select()
                .single();

              if (updateError) throw updateError;
              result = { success: true, data: updateData, message: `Board tile status updated to "${parsedArgs.status}"` };
              break;

            case 'get_board_tiles':
              const { data: tilesData, error: tilesError } = await supabase
                .from('board_tiles')
                .select('*')
                .order('created_at', { ascending: false });

              if (tilesError) throw tilesError;
              result = { success: true, data: tilesData, message: `Found ${tilesData.length} board tiles` };
              break;

            case 'get_notes':
              const { data: notesData, error: notesError } = await supabase
                .from('notes')
                .select('*')
                .order('updated_at', { ascending: false });

              if (notesError) throw notesError;
              result = { success: true, data: notesData, message: `Found ${notesData.length} notes` };
              break;

            default:
              result = { success: false, error: `Unknown tool: ${name}` };
          }
        } catch (error) {
          console.error(`Error executing tool ${name}:`, error);
          result = { success: false, error: error.message };
        }

        toolResults.push({
          tool_call_id: toolCall.id,
          role: "tool",
          content: JSON.stringify(result)
        });
      }

      // Get final response after tool execution
      const finalMessages = [
        ...messages,
        assistantMessage,
        ...toolResults
      ];

      const finalResponse = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${openAIApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            {
              role: 'system',
              content: `You are a helpful AI assistant that can help users manage their notes and board tiles/tasks. You have access to tools that allow you to:
              - Create new notes
              - Create new board tiles/tasks
              - Update board tile status
              - View existing notes and board tiles
              
              When users ask you to create something, use the appropriate tool. Be conversational and helpful. Always confirm what you've done after using a tool.`
            },
            ...finalMessages
          ]
        }),
      });

      const finalData = await finalResponse.json();
      assistantMessage = finalData.choices[0].message;
    }

    return new Response(JSON.stringify({ message: assistantMessage }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in ai-assistant function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
