import React, { useState } from 'react';
import { BookOpen, Calendar, Clock, ArrowRight, ArrowLeft, AlignLeft, ShieldCheck, HelpCircle, FileJson, ExternalLink } from 'lucide-react';
import { BlogPost } from '../types';

interface BlogViewProps {
  posts: BlogPost[];
  onSelectProductCategory: (category: string) => void;
}

export default function BlogView({ posts, onSelectProductCategory }: BlogViewProps) {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [showSeoAudit, setShowSeoAudit] = useState(false);

  const categories = ['All', ...Array.from(new Set(posts.map((post) => post.category)))];

  const filteredPosts = activeCategory === 'All' 
    ? posts 
    : posts.filter((post) => post.category === activeCategory);

  const handlePostClick = (post: BlogPost) => {
    setSelectedPost(post);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackClick = () => {
    setSelectedPost(null);
    setShowSeoAudit(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Dedicated Reader mode for specific article
  if (selectedPost) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 space-y-10 animate-fade-in">
        
        {/* Navigation back and SEO indicator toggle */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-6">
          <button
            onClick={handleBackClick}
            className="inline-flex items-center space-x-2 text-xs font-semibold text-gray-500 hover:text-[#132c30] uppercase tracking-wider cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Article List</span>
          </button>

          <button
            onClick={() => setShowSeoAudit(!showSeoAudit)}
            className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full border border-[#d97706]/30 text-[#b45309] font-mono text-xs bg-[#d97706]/5 hover:bg-[#d97706]/10"
          >
            <FileJson className="w-3.5 h-3.5" />
            <span>{showSeoAudit ? 'Hide SEO Audit Tags' : 'Inspect Article SEO Metadata'}</span>
          </button>
        </div>

        {/* Dynamic SEO Meta-Audit panel */}
        {showSeoAudit && (
          <div className="bg-slate-900 text-slate-300 p-6 rounded-3xl border border-slate-800 font-mono text-xs space-y-4 animate-slide-down">
            <h4 className="text-amber-500 font-bold uppercase tracking-wider">// Article SEO Audit Schema Configuration</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-slate-800 pt-4">
              <div className="space-y-2">
                <div>
                  <span className="text-gray-400 block uppercase text-[10px]">Title Tag:</span>
                  <strong className="text-white text-sm">{selectedPost.title} | BuyRetat</strong>
                </div>
                <div>
                  <span className="text-gray-400 block uppercase text-[10px]">Meta Description:</span>
                  <p className="text-slate-400 leading-normal">{selectedPost.metaDescription}</p>
                </div>
                <div>
                  <span className="text-gray-400 block uppercase text-[10px]">Canonical URL:</span>
                  <code className="text-blue-400">https://buyretat.co.uk/blog/{selectedPost.slug}</code>
                </div>
              </div>
              <div className="space-y-2 border-t md:border-t-0 md:border-l border-slate-800 md:pl-4">
                <div>
                  <span className="text-gray-400 block uppercase text-[10px]">OpenGraph Property (og:type):</span>
                  <code className="text-[#10b981]">article</code>
                </div>
                <div>
                  <span className="text-gray-400 block uppercase text-[10px]">JSON-LD Article Schema:</span>
                  <pre className="bg-slate-950 p-3 rounded-lg overflow-x-auto text-[10px] leading-relaxed max-h-36">
{`{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "${selectedPost.title}",
  "datePublished": "2026-06-29",
  "author": {
    "@type": "Organization",
    "name": "Alluvi BuyRetat UK"
  },
  "publisher": {
    "@type": "Organization",
    "name": "BuyRetat UK",
    "logo": "https://buyretat.co.uk/logo.png"
  }
}`}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Article Header */}
        <article className="space-y-6">
          <div className="space-y-3.5 text-center sm:text-left">
            <span className="bg-[#2e5b62]/10 text-[#2e5b62] font-mono text-xs font-bold px-3 py-1 rounded-full uppercase">
              {selectedPost.category}
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-sans font-black text-[#111827] leading-tight">
              {selectedPost.title}
            </h1>
            
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs font-mono text-gray-400">
              <span className="flex items-center space-x-1">
                <Calendar className="w-4 h-4 text-gray-300" />
                <span>{selectedPost.date}</span>
              </span>
              <span className="w-1.5 h-1.5 bg-gray-200 rounded-full" />
              <span className="flex items-center space-x-1">
                <Clock className="w-4 h-4 text-gray-300" />
                <span>{selectedPost.readTime}</span>
              </span>
              <span className="w-1.5 h-1.5 bg-gray-200 rounded-full" />
              <span className="text-[#10b981] font-bold">100% SEO OPTIMIZED</span>
            </div>
          </div>

          {/* Large Hero Banner Placeholder */}
          <div className="w-full aspect-video rounded-3xl overflow-hidden border border-gray-100 shadow-sm relative">
            <img src={selectedPost.featuredImage} alt={selectedPost.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start pt-4">
            
            {/* Clickable Table of Contents sticky left */}
            <div className="md:col-span-4 bg-slate-50 border border-gray-100 p-6 rounded-3xl md:sticky md:top-24 space-y-4">
              <div className="flex items-center space-x-2 text-[#132c30] font-sans font-extrabold text-sm uppercase tracking-wider border-b border-gray-200/60 pb-3">
                <AlignLeft className="w-4.5 h-4.5 text-[#2e5b62]" />
                <span>Table of Contents</span>
              </div>
              <ul className="space-y-2.5 font-sans text-xs">
                {selectedPost.tableOfContents.map((header, i) => (
                  <li key={i}>
                    <a 
                      href={`#section-${i}`}
                      className="block text-gray-500 hover:text-[#2e5b62] hover:underline font-medium transition-colors"
                    >
                      {header}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Main content body right */}
            <div className="md:col-span-8 space-y-8 text-gray-600 text-base leading-relaxed font-sans">
              
              {/* Introduction */}
              <p className="text-lg text-gray-800 font-medium border-l-4 border-[#2e5b62] pl-4 italic">
                {selectedPost.introduction}
              </p>

              {/* Subsections rendering */}
              {selectedPost.sections.map((sec, idx) => (
                <div key={idx} id={`section-${idx}`} className="space-y-4 pt-4 border-t border-gray-100 first:border-0 first:pt-0 scroll-mt-28">
                  <h2 className="text-xl sm:text-2xl font-sans font-black text-[#111827]">
                    {sec.heading}
                  </h2>
                  <p>{sec.content}</p>

                  {sec.subsections && sec.subsections.length > 0 && (
                    <div className="grid grid-cols-1 gap-4 mt-3">
                      {sec.subsections.map((sub, sidx) => (
                        <div key={sidx} className="bg-slate-50 p-5 rounded-2xl border border-gray-100 space-y-1.5">
                          <h3 className="font-sans font-extrabold text-sm text-[#132c30]">
                            {sub.title}
                          </h3>
                          <p className="text-xs text-gray-500 leading-normal">{sub.content}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {/* Authoritative Outbound Links Section */}
              <div className="bg-[#eef4f4]/60 p-5 rounded-2xl border border-[#2e5b62]/10 space-y-3.5 text-xs text-gray-500">
                <h4 className="font-mono font-bold text-[#132c30] uppercase tracking-wider flex items-center space-x-1.5">
                  <BookOpen className="w-4 h-4 text-[#2e5b62]" />
                  <span>Authoritative References &amp; Outbound Citations</span>
                </h4>
                <p>This article is compiled based on verified pre-clinical biochemical publications. You can inspect the molecular literature directly:</p>
                <div className="flex flex-wrap gap-3 font-mono">
                  <a href="https://pubmed.ncbi.nlm.nih.gov/" target="_blank" rel="noopener noreferrer" className="bg-white px-3 py-1.5 rounded-lg border border-gray-200 hover:border-[#2e5b62] text-gray-600 hover:text-[#2e5b62] flex items-center space-x-1 transition-colors">
                    <span>PubMed Central (NCBI)</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a href="https://www.nature.com/" target="_blank" rel="noopener noreferrer" className="bg-white px-3 py-1.5 rounded-lg border border-gray-200 hover:border-[#2e5b62] text-gray-600 hover:text-[#2e5b62] flex items-center space-x-1 transition-colors">
                    <span>Nature Medicine Portal</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* In-Article FAQ Accordion */}
              {selectedPost.faqs && selectedPost.faqs.length > 0 && (
                <div className="space-y-4 pt-6 border-t border-gray-100">
                  <h3 className="font-sans font-black text-[#111827] text-lg flex items-center space-x-2">
                    <HelpCircle className="w-5 h-5 text-[#2e5b62]" />
                    <span>Scientific Context Q&amp;A</span>
                  </h3>
                  <div className="space-y-2.5">
                    {selectedPost.faqs.map((faq, fidx) => (
                      <div key={fidx} className="bg-slate-50 border border-gray-100 p-4 rounded-xl space-y-1.5 text-xs">
                        <strong className="block text-[#132c30] font-sans font-bold">{faq.question}</strong>
                        <p className="text-gray-500 leading-normal">{faq.answer}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Custom in-article CTA block */}
              <div className="bg-[#132c30] text-white p-8 rounded-3xl space-y-4 text-center">
                <h4 className="font-sans font-black text-xl text-[#10b981]">{selectedPost.category} Sourcing</h4>
                <p className="text-slate-300 text-sm max-w-lg mx-auto">{selectedPost.callToAction}</p>
                <button
                  onClick={() => {
                    setSelectedPost(null);
                    onSelectProductCategory(selectedPost.category === 'Retatrutide Research' ? 'Retatrutide' : 'All');
                  }}
                  className="px-6 py-3 bg-gradient-to-r from-[#10b981] to-[#14b8a6] text-[#132c30] font-bold rounded-xl text-xs uppercase tracking-wider shadow hover:shadow-lg transition-shadow cursor-pointer inline-flex items-center space-x-1.5"
                >
                  <span>Order HPLC Verified Peptides</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>

          </div>
        </article>

      </div>
    );
  }

  // Phase 1: Core 15 Article List Grid view
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10 animate-fade-in">
      
      {/* Search and Category header */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-b border-gray-100 pb-6">
        <div>
          <h2 className="text-3xl font-sans font-black text-[#111827]">Peptide Research Journal</h2>
          <p className="text-gray-500 text-sm mt-1">Explore our 15 peer-reviewed, UK-focused, and highly cited peptide literature publications.</p>
        </div>

        {/* Category switcher */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all duration-200 cursor-pointer ${
                activeCategory === cat
                  ? 'bg-[#132c30] text-white shadow'
                  : 'bg-slate-50 text-gray-500 hover:text-[#132c30] hover:bg-slate-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Articles Grid layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPosts.map((post) => (
          <div 
            key={post.id}
            id={`blog-card-${post.id}`}
            onClick={() => handlePostClick(post)}
            className="bg-white rounded-3xl border border-gray-100 hover:border-[#2e5b62]/20 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between group cursor-pointer"
          >
            {/* Graphic Image Banner */}
            <div className="w-full aspect-video overflow-hidden relative bg-slate-100">
              <img src={post.featuredImage} alt={post.title} className="w-full h-full object-cover transform group-hover:scale-[1.02] transition-transform duration-500" referrerPolicy="no-referrer" />
              <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-lg text-[9px] font-mono font-bold text-[#132c30] border border-gray-100 shadow-xs uppercase">
                {post.category}
              </div>
            </div>

            {/* Content Body */}
            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                
                {/* Meta details */}
                <div className="flex items-center space-x-3 text-[10px] font-mono text-gray-400">
                  <span className="flex items-center space-x-1">
                    <Calendar className="w-3.5 h-3.5 text-gray-300" />
                    <span>{post.date}</span>
                  </span>
                  <span>•</span>
                  <span className="flex items-center space-x-1">
                    <Clock className="w-3.5 h-3.5 text-gray-300" />
                    <span>{post.readTime}</span>
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-sans font-extrabold text-[#111827] text-base group-hover:text-[#2e5b62] transition-colors duration-200 line-clamp-2 leading-snug">
                  {post.title}
                </h3>

                {/* Intro extract */}
                <p className="text-gray-500 text-xs leading-relaxed line-clamp-3">
                  {post.introduction}
                </p>
              </div>

              {/* Action footer link */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-50 text-xs font-semibold text-[#132c30] group-hover:text-[#2e5b62] transition-colors">
                <span className="uppercase tracking-wider">Read Full Article</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
