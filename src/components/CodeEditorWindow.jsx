import React from 'react';
import TypewriterText from './TypewriterText';

const CodeEditorWindow = () => {
  const messagesToType = [
    "Sylithe",
    "The carbon intelligence platform enabling confident climate action.",
    "Trusted ratings, pricing intelligence, and geospatial data — built for confident climate decisions.",
   
  ];

  return (
    // CHANGE: Updated bg to 'bg-sylitheDark/90' to match the graph on the right
    <div className="w-full h-full rounded-xl overflow-hidden shadow-2xl border border-white/10 bg-sylitheDark/90 backdrop-blur-md flex flex-col">
      
      {/* Header Bar - made slightly darker than the body for contrast */}
      <div className="bg-black/40 px-6 py-4 flex items-center gap-3 border-b border-white/5 shrink-0">
        <div className="w-4 h-4 rounded-full bg-[#FF5F56]"></div> 
        <div className="w-4 h-4 rounded-full bg-[#FFBD2E]"></div> 
        <div className="w-4 h-4 rounded-full bg-[#27C93F]"></div> 
        <div className="flex-grow text-center text-gray-400 text-sm font-medium ml-[-60px]">
          sylithe — -zsh
        </div>
      </div>

      {/* Editor Body */}
      <div className="p-8 md:p-12 grow flex items-start">
         <TypewriterText texts={messagesToType} />
      </div>
    </div>
  );
};

export default CodeEditorWindow;