import * as React from 'react';

export const useLoading = () => {
    const [isLoading, setIsLoading] = React.useState(false);

    const onLoad = () => {
        setIsLoading(true);
    };

    const onLoaded = () => {
        setIsLoading(false);
    };


    return {
        isLoading,
        onLoad,
        onLoaded
    };
}