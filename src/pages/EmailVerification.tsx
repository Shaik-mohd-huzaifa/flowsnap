
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const EmailVerification = () => {
  const [searchParams] = useSearchParams();
  const [verificationStatus, setVerificationStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const token = searchParams.get('token');
        const type = searchParams.get('type');

        if (!token || type !== 'signup') {
          setVerificationStatus('error');
          setErrorMessage('Invalid verification link.');
          return;
        }

        const { error } = await supabase.auth.verifyOtp({
          token_hash: token,
          type: 'signup'
        });

        if (error) {
          console.error('Email verification error:', error);
          setVerificationStatus('error');
          setErrorMessage(error.message || 'Failed to verify email. The link may have expired.');
        } else {
          setVerificationStatus('success');
          toast({
            title: "Email verified successfully!",
            description: "Your account has been activated. You can now sign in.",
          });
          // Redirect to login after a short delay
          setTimeout(() => {
            navigate('/login');
          }, 3000);
        }
      } catch (error) {
        console.error('Unexpected error during verification:', error);
        setVerificationStatus('error');
        setErrorMessage('An unexpected error occurred during verification.');
      }
    };

    verifyEmail();
  }, [searchParams, navigate, toast]);

  const handleResendVerification = async () => {
    // This would require the user's email, which we don't have in this context
    // In a real app, you might want to redirect to a page where they can enter their email
    navigate('/signup');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white flex items-center justify-center p-4 font-inter">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-2xl font-instrument">F</span>
          </div>
          <h1 className="font-instrument text-3xl font-bold text-gray-900">Email Verification</h1>
          <p className="text-gray-600 mt-2">Confirming your email address</p>
        </div>

        <Card className="border-gray-200 shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="font-instrument text-xl flex items-center justify-center gap-2">
              {verificationStatus === 'loading' && (
                <>
                  <Loader2 className="h-5 w-5 animate-spin text-orange-500" />
                  Verifying...
                </>
              )}
              {verificationStatus === 'success' && (
                <>
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  Verification Successful
                </>
              )}
              {verificationStatus === 'error' && (
                <>
                  <XCircle className="h-5 w-5 text-red-500" />
                  Verification Failed
                </>
              )}
            </CardTitle>
            <CardDescription>
              {verificationStatus === 'loading' && 'Please wait while we verify your email address...'}
              {verificationStatus === 'success' && 'Your email has been successfully verified!'}
              {verificationStatus === 'error' && 'There was a problem verifying your email address.'}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {verificationStatus === 'success' && (
              <div className="text-center space-y-4">
                <p className="text-sm text-gray-600">
                  Your account is now active. You will be redirected to the login page in a few seconds.
                </p>
                <Button 
                  onClick={() => navigate('/login')}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white"
                >
                  Go to Login
                </Button>
              </div>
            )}

            {verificationStatus === 'error' && (
              <div className="text-center space-y-4">
                <p className="text-sm text-red-600 bg-red-50 p-3 rounded-md">
                  {errorMessage}
                </p>
                <div className="space-y-2">
                  <Button 
                    onClick={handleResendVerification}
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white"
                  >
                    Try Again
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => navigate('/login')}
                    className="w-full"
                  >
                    Back to Login
                  </Button>
                </div>
              </div>
            )}

            {verificationStatus === 'loading' && (
              <div className="text-center">
                <div className="animate-pulse">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="mt-6 text-center text-sm text-gray-600">
          Need help? Contact our support team for assistance.
        </div>
      </div>
    </div>
  );
};

export default EmailVerification;
