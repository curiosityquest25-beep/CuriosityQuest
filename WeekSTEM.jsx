import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, BookOpen, Loader2, Archive, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import STEMPostCard from '../components/stem/STEMPostCard';
import STEMPostDetail from '../components/stem/STEMPostDetail';
import STEMWordCard from '../components/stem/STEMWordCard';

const topicFilters = [
  { id: 'all', label: 'All Topics' },
  { id: 'science', label: 'Science' },
  { id: 'technology', label: 'Technology' },
  { id: 'engineering', label: 'Engineering' },
  { id: 'math', label: 'Math' },
];

export default function ThisWeekInSTEM() {
  const [selectedTopic, setSelectedTopic] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPost, setSelectedPost] = useState(null);

  const { data: posts = [], isLoading: loadingPosts } = useQuery({
    queryKey: ['stemPosts'],
    queryFn: () => base44.entities.STEMPost.list('-week_date'),
  });

  const { data: words = [], isLoading: loadingWords } = useQuery({
    queryKey: ['stemWords'],
    queryFn: () => base44.entities.STEMWord.list('-word_date'),
  });

  // Get most recent post and word
  const featuredPost = posts[0];
  const featuredWord = words[0];
  const archivePosts = posts.slice(1);

  const filteredPosts = archivePosts.filter((post) => {
    const matchesTopic = selectedTopic === 'all' || post.topic === selectedTopic;
    const matchesSearch = !searchQuery || 
      post.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.summary?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTopic && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="bg-gradient-to-br from-[#055b8e] to-[#044a73] text-white py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white/90 text-sm font-medium mb-6"
          >
            <Sparkles className="w-4 h-4 text-[#ed7219]" />
            New content every week
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl font-bold mb-4"
            style={{ fontFamily: 'Nunito, sans-serif' }}
          >
            This Week in STEM
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-white/80 max-w-2xl mx-auto"
          >
            Explore fascinating questions about science, technology, engineering, and math—made simple and fun for curious minds!
          </motion.p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {loadingPosts || loadingWords ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-[#055b8e]" />
          </div>
        ) : (
          <>
            {/* Featured Section */}
            <div className="grid lg:grid-cols-3 gap-6 mb-16">
              {/* Featured Post */}
              <div className="lg:col-span-2">
                {featuredPost ? (
                  <STEMPostCard 
                    post={featuredPost} 
                    featured 
                    onClick={() => setSelectedPost(featuredPost)} 
                  />
                ) : (
                  <div className="bg-white rounded-3xl p-8 text-center">
                    <BookOpen className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                    <h3 className="text-xl font-semibold text-gray-500 mb-2" style={{ fontFamily: 'Nunito, sans-serif' }}>
                      Coming Soon
                    </h3>
                    <p className="text-gray-400">
                      Check back for this week's topic!
                    </p>
                  </div>
                )}
              </div>

              {/* Featured Word & Previous Words */}
              <div className="space-y-4">
                {featuredWord ? (
                  <STEMWordCard word={featuredWord} featured />
                ) : (
                  <div className="bg-white rounded-2xl p-6 text-center border border-gray-200">
                    <BookOpen className="w-12 h-12 mx-auto text-gray-300 mb-3" />
                    <p className="text-gray-400">Word of the day coming soon!</p>
                  </div>
                )}

                {/* Previous Words */}
                {words.length > 1 && (
                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-500 text-sm flex items-center gap-2">
                      <Archive className="w-4 h-4" />
                      Previous Words
                    </h4>
                    {words.slice(1, 5).map((word) => (
                      <STEMWordCard key={word.id} word={word} />
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Archive Section */}
            {archivePosts.length > 0 && (
              <section>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
                  <h2 
                    className="text-2xl font-bold text-[#055b8e] flex items-center gap-2"
                    style={{ fontFamily: 'Nunito, sans-serif' }}
                  >
                    <Archive className="w-6 h-6" />
                    Archive
                  </h2>

                  {/* Search */}
                  <div className="relative max-w-xs w-full">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      placeholder="Search posts..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 rounded-xl border-gray-200"
                    />
                  </div>
                </div>

                {/* Topic Filters */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {topicFilters.map((topic) => (
                    <Button
                      key={topic.id}
                      variant={selectedTopic === topic.id ? 'default' : 'outline'}
                      onClick={() => setSelectedTopic(topic.id)}
                      className={`rounded-full ${
                        selectedTopic === topic.id 
                          ? 'bg-[#055b8e] hover:bg-[#044a73]' 
                          : 'hover:bg-[#055b8e]/10 hover:text-[#055b8e] hover:border-[#055b8e]'
                      }`}
                    >
                      {topic.label}
                    </Button>
                  ))}
                </div>

                {filteredPosts.length === 0 ? (
                  <div className="text-center py-16 bg-white rounded-2xl">
                    <Search className="w-12 h-12 mx-auto text-gray-300 mb-4" />
                    <h3 className="text-lg font-semibold text-gray-500 mb-2" style={{ fontFamily: 'Nunito, sans-serif' }}>
                      No posts found
                    </h3>
                    <p className="text-gray-400">
                      Try adjusting your search or filter
                    </p>
                  </div>
                ) : (
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredPosts.map((post, index) => (
                      <STEMPostCard
                        key={post.id}
                        post={post}
                        index={index}
                        onClick={() => setSelectedPost(post)}
                      />
                    ))}
                  </div>
                )}
              </section>
            )}
          </>
        )}
      </div>

      {/* Detail Modal */}
      {selectedPost && (
        <STEMPostDetail
          post={selectedPost}
          onClose={() => setSelectedPost(null)}
        />
      )}
    </div>
  );
}
