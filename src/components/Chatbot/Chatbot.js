import React, { useEffect } from 'react';

function Chatbot() {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://static.elfsight.com/platform/platform.js';
        script.setAttribute('data-use-service-core', '');
        script.defer = true;

        document.body.appendChild(script);

        const div = document.createElement('div');
        div.className = 'elfsight-app-40e4d441-41b1-4c02-b9d6-c880649e3f21';
        div.setAttribute('data-elfsight-app-lazy', '');

        // Add CSS to the div
        div.style.position = 'relative'; // Change as needed
        div.style.marginTop = '3px'; // Change as needed

        document.body.appendChild(div);

        // Clean up function
        return () => {
            document.body.removeChild(script);
            document.body.removeChild(div);
        };
    }, []);

    return <div></div>;
}

export default Chatbot;
