import React, { useState } from 'react';
import { AgentType, ThemeStyle, GeneratedCreative } from './types';
import { AGENTS, getIcon } from './constants';
import { generateCarouselContent } from './services/geminiService';
import CarouselSlide from './components/CarouselSlide';
import { Loader2, Wand2, RefreshCw, AlertCircle, CheckCircle2, Layers } from 'lucide-react';

const App: React.FC = () => {
  const [selectedAgent, setSelectedAgent] = useState<AgentType>(AgentType.COMBO_ALL);
  const [theme, setTheme] = useState<ThemeStyle>(ThemeStyle.DARK);
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState<GeneratedCreative | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await generateCarouselContent(selectedAgent);
      setContent(data);
    } catch (err: any) {
      setError("Failed to generate content. Please check your API key or try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row font-sans">
      
      {/* LEFT SIDEBAR: Controls */}
      <aside className="w-full md:w-1/3 lg:w-1/4 bg-white border-r border-slate-200 p-6 flex flex-col h-auto md:h-screen overflow-y-auto sticky top-0 z-20">
        <div className="mb-8">
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <span className="text-blue-600">Up</span>Career <span className="text-xs bg-slate-100 px-2 py-1 rounded text-slate-500 font-normal">AI Studio</span>
          </h1>
          <p className="text-slate-500 text-sm mt-2">Generate professional LinkedIn carousels for your Career Agents.</p>
        </div>

        {/* Agent Selection */}
        <div className="space-y-6 flex-grow">
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
              Select Product
            </label>
            <div className="space-y-2">
              {AGENTS.map((agent) => (
                <button
                  key={agent.id}
                  onClick={() => setSelectedAgent(agent.id as AgentType)}
                  className={`w-full text-left p-3 rounded-xl border transition-all duration-200 flex items-start gap-3 group
                    ${selectedAgent === agent.id 
                      ? 'border-blue-600 bg-blue-50 ring-1 ring-blue-600 shadow-sm' 
                      : 'border-slate-200 hover:border-blue-300 hover:bg-slate-50'
                    }`}
                >
                  <div className={`${selectedAgent === agent.id ? 'text-blue-600' : 'text-slate-400 group-hover:text-slate-600'}`}>
                    {getIcon(agent.icon, "w-5 h-5")}
                  </div>
                  <div>
                    <div className={`text-sm font-semibold ${selectedAgent === agent.id ? 'text-blue-900' : 'text-slate-700'}`}>
                      {agent.name}
                    </div>
                    <div className="text-xs text-slate-500 mt-0.5 leading-tight">
                      {agent.description}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Theme Selection */}
          <div>
             <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
              Visual Style
            </label>
            <div className="grid grid-cols-3 gap-2">
              {Object.values(ThemeStyle).map((style) => (
                <button
                  key={style}
                  onClick={() => setTheme(style)}
                  className={`text-xs font-medium py-2 px-1 rounded-lg border text-center transition-colors
                    ${theme === style 
                      ? 'bg-slate-900 text-white border-slate-900' 
                      : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
                    }`}
                >
                  {style.split(' ')[0]}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Generate Button */}
        <div className="mt-8 pt-6 border-t border-slate-100">
           {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-600 text-xs rounded-lg flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              {error}
            </div>
          )}
          
          <button
            onClick={handleGenerate}
            disabled={loading}
            className={`w-full py-4 rounded-xl font-bold text-white shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2 transition-all
              ${loading 
                ? 'bg-slate-400 cursor-not-allowed' 
                : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:scale-[1.02] hover:shadow-xl'
              }`}
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Wand2 className="w-5 h-5" />
                Generate Creative
              </>
            )}
          </button>
        </div>
      </aside>

      {/* RIGHT MAIN AREA: Preview */}
      <main className="flex-grow bg-slate-100 h-screen overflow-hidden flex flex-col relative">
        
        {/* Background Pattern */}
        <div className="absolute inset-0 z-0 opacity-40 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>

        {/* Header */}
        <header className="relative z-10 p-6 flex justify-between items-center">
          <div>
            <h2 className="text-lg font-bold text-slate-800">Preview</h2>
            <p className="text-xs text-slate-500">
              {content ? `Generated for: ${content.topic}` : 'Select an agent to start'}
            </p>
          </div>
          {content && (
             <button onClick={handleGenerate} className="text-xs flex items-center gap-1.5 text-slate-500 hover:text-blue-600 transition-colors bg-white px-3 py-1.5 rounded-full border border-slate-200 shadow-sm">
                <RefreshCw className="w-3 h-3" />
                Regenerate
             </button>
          )}
        </header>

        {/* Carousel Area */}
        <div className="relative z-10 flex-grow flex items-center justify-start overflow-x-auto no-scrollbar pl-6 pr-12 pb-12">
          {!content && !loading && (
            <div className="w-full flex flex-col items-center justify-center text-slate-400 opacity-60">
               <Layers className="w-16 h-16 mb-4 text-slate-300" />
               <p className="text-sm font-medium">Ready to create magic.</p>
            </div>
          )}

          {loading && (
            <div className="w-full flex flex-col items-center justify-center gap-4">
              <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-slate-600 font-medium animate-pulse">Consulting the AI Strategist...</p>
            </div>
          )}

          {content && !loading && (
             <div className="flex gap-6">
               {content.slides.map((slide) => (
                 <CarouselSlide 
                    key={slide.id} 
                    slide={slide} 
                    theme={theme} 
                    totalSlides={content.slides.length} 
                  />
               ))}
               
               {/* End spacer */}
               <div className="w-8 flex-shrink-0"></div>
             </div>
          )}
        </div>

        {/* Footer/Status Bar */}
        {content && (
          <div className="bg-white border-t border-slate-200 p-3 px-6 text-xs text-slate-500 flex justify-between items-center z-20">
             <div className="flex items-center gap-2">
               <span className="font-semibold text-slate-700">Target Audience:</span>
               <span>{content.targetAudience}</span>
             </div>
             <div className="flex items-center gap-1 text-emerald-600">
               <CheckCircle2 className="w-3 h-3" />
               <span>Content Optimized</span>
             </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;