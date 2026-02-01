import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Mail, MailOpen, Loader2, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AdminMessages() {
  const [selectedMessage, setSelectedMessage] = useState(null);
  const queryClient = useQueryClient();

  const { data: messages = [], isLoading } = useQuery({
    queryKey: ['contactMessages'],
    queryFn: () => base44.entities.ContactMessage.list('-created_date'),
  });

  const updateStatusMutation = useMutation({
    mutationFn: ({ id, status }) => base44.entities.ContactMessage.update(id, { status }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contactMessages'] });
    },
  });

  const deleteMessageMutation = useMutation({
    mutationFn: (id) => base44.entities.ContactMessage.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contactMessages'] });
      setSelectedMessage(null);
    },
  });

  const handleMarkRead = (msg) => {
    if (msg.status === 'unread') {
      updateStatusMutation.mutate({ id: msg.id, status: 'read' });
    }
    setSelectedMessage(msg);
  };

  const statusColors = {
    unread: 'bg-red-100 text-red-800',
    read: 'bg-blue-100 text-blue-800',
    responded: 'bg-green-100 text-green-800'
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-[#055b8e] mb-8" style={{ fontFamily: 'Nunito, sans-serif' }}>
          Contact Messages
        </h1>

        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-[#055b8e]" />
          </div>
        ) : messages.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <Mail className="w-12 h-12 mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500">No messages yet</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Message List */}
            <div className="lg:col-span-1 space-y-3">
              {messages.map((msg, index) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card 
                    className={`cursor-pointer hover:shadow-md transition-shadow ${
                      selectedMessage?.id === msg.id ? 'border-[#055b8e] border-2' : ''
                    }`}
                    onClick={() => handleMarkRead(msg)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          {msg.status === 'unread' ? (
                            <Mail className="w-4 h-4 text-[#ed7219]" />
                          ) : (
                            <MailOpen className="w-4 h-4 text-gray-400" />
                          )}
                          <Badge className={statusColors[msg.status]}>
                            {msg.status}
                          </Badge>
                        </div>
                      </div>
                      <p className="font-semibold text-[#055b8e] mb-1">{msg.name}</p>
                      <p className="text-sm text-gray-500 mb-2">{msg.email}</p>
                      <p className="text-sm text-gray-600 line-clamp-2">{msg.message}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Message Detail */}
            <div className="lg:col-span-2">
              {selectedMessage ? (
                <Card>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-2xl text-[#055b8e]" style={{ fontFamily: 'Nunito, sans-serif' }}>
                          {selectedMessage.subject || 'No Subject'}
                        </CardTitle>
                        <p className="text-sm text-gray-500 mt-2">
                          From: {selectedMessage.name} ({selectedMessage.email})
                        </p>
                        <p className="text-sm text-gray-400">
                          {new Date(selectedMessage.created_date).toLocaleString()}
                        </p>
                      </div>
                      <Badge className={statusColors[selectedMessage.status]}>
                        {selectedMessage.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="bg-gray-50 rounded-xl p-6">
                      <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                        {selectedMessage.message}
                      </p>
                    </div>

                    <div className="flex gap-3">
                      <Button
                        onClick={() => updateStatusMutation.mutate({ 
                          id: selectedMessage.id, 
                          status: 'responded' 
                        })}
                        disabled={selectedMessage.status === 'responded'}
                        className="bg-[#055b8e] hover:bg-[#044a73]"
                      >
                        Mark as Responded
                      </Button>
                      <Button
                        onClick={() => window.location.href = `mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject || 'Your Message'}`}
                        variant="outline"
                        className="border-[#055b8e] text-[#055b8e]"
                      >
                        Reply via Email
                      </Button>
                      <Button
                        onClick={() => {
                          if (confirm('Delete this message?')) {
                            deleteMessageMutation.mutate(selectedMessage.id);
                          }
                        }}
                        variant="outline"
                        className="border-red-500 text-red-500 hover:bg-red-50 ml-auto"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  <CardContent className="py-20 text-center">
                    <Mail className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                    <p className="text-gray-500">Select a message to view details</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
