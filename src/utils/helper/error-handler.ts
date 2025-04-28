export const handleFirebaseError = (error: any) => {
    switch(error.code){
        case 'auth/invalid-email':
            return'The email address is not valid.'
        case 'auth/invalid-credential':
            return 'The provided credentials are invalid.'
        case 'invalid-argument':
            return 'Unsupported field value'
        case 'auth/network-request-failed':
            return 'Your device does not have a healthy Internet connection at the moment.'
        case 'auth/missing-password':
            return 'Password is missing.'
        case 'auth/weak-password':
            return 'Password should be at least 6 characters'
        case 'auth/email-already-in-use':
            return 'Current Email already in use.'
        case 'auth/invalid-phone-number':
            return 'Phone number provided is incorrect. [country code]'
        case 'auth/billing-not':
            return 'Billing not enabled'
        default:
            return 'An unexpected error occurred. Please try again.'
    }
}