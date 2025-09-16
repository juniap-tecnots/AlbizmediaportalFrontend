'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft, 
  Eye, 
  Monitor, 
  Tablet, 
  Smartphone,
  Check,
  Palette,
  Settings,
  Download
} from 'lucide-react';
import { 
  selectThemeById,
  selectActiveTheme,
  setActiveTheme
} from '@/lib/redux/slices/themesSlice';
import type { RootState } from '@/lib/redux/store';
import { BlockRenderer } from '@/components/blocks/BlockRenderer';

export default function ThemePreviewPage() {
  const params = useParams();
  const router = useRouter();
  const themeId = params.id as string;
  
  const theme = useSelector((state: RootState) => selectThemeById(state, themeId));
  const activeTheme = useSelector(selectActiveTheme);
  
  const [previewMode, setPreviewMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  const handleBack = () => {
    router.back();
  };

  const handleActivateTheme = () => {
    if (theme) {
      // Dispatch action to activate theme
      console.log('Activating theme:', theme.id);
      router.push('/content/pages/themes');
    }
  };

  const handleCustomizeTheme = () => {
    router.push(`/content/pages/themes/customize/${themeId}`);
  };

  const handleEditTheme = () => {
    router.push(`/content/pages/themes/editor/${themeId}`);
  };

  if (!theme) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card>
          <CardContent className="p-8 text-center">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Theme Not Found</h2>
            <p className="text-gray-600 mb-4">The requested theme could not be found.</p>
            <Button onClick={handleBack}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Go Back
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const previewModes = [
    { id: 'desktop', name: 'Desktop', icon: Monitor },
    { id: 'tablet', name: 'Tablet', icon: Tablet },
    { id: 'mobile', name: 'Mobile', icon: Smartphone },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Top Navigation Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={handleBack}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm font-medium text-gray-900">{theme.name}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {/* Preview Mode Selector */}
            <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
              {previewModes.map((mode) => (
                <Button
                  key={mode.id}
                  variant={previewMode === mode.id ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setPreviewMode(mode.id as any)}
                  className="h-8 w-8 p-0"
                >
                  <mode.icon className="h-4 w-4" />
                </Button>
              ))}
            </div>
            
            <Button variant="outline" size="sm" onClick={handleCustomizeTheme}>
              <Palette className="h-4 w-4 mr-2" />
              Customize
            </Button>
            {!theme.isActive && (
              <Button size="sm" onClick={handleActivateTheme}>
                <Check className="h-4 w-4 mr-2" />
                Activate
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Preview Content */}
      <div className="pt-16 flex justify-center p-6">
        <div className={`bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 ${
          previewMode === 'mobile' ? 'w-80' : 
          previewMode === 'tablet' ? 'w-2xl' : 
          'w-full max-w-6xl'
        }`}>
          {/* Theme Preview */}
          <div className="relative">
            {/* Navbar Preview */}
            <div 
              className="w-full px-6 py-4 flex items-center justify-between"
              style={{ 
                backgroundColor: theme.navbar.styling.backgroundColor,
                color: theme.navbar.styling.textColor,
                height: theme.navbar.styling.height 
              }}
            >
              <div className="flex items-center gap-4">
                <div className="font-bold text-xl">{theme.navbar.config.logo}</div>
                <nav className="hidden md:flex items-center gap-6">
                  {theme.navbar.config.menuItems.map((item: any, index: number) => (
                    <a key={index} href={item.href} className="hover:opacity-80 transition-opacity">
                      {item.label}
                    </a>
                  ))}
                </nav>
              </div>
              {theme.navbar.config.showSearch && (
                <div className="flex items-center gap-2">
                  <input 
                    type="text" 
                    placeholder="Search..." 
                    className="px-3 py-1 rounded border border-gray-300 text-gray-900"
                  />
                  <button className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 transition-colors">
                    Search
                  </button>
                </div>
              )}
            </div>

            {/* Hero Banner Preview */}
            <div 
              className="relative w-full bg-cover bg-center flex items-center justify-center"
              style={{ 
                backgroundImage: `url(${theme.heroBanner.config.backgroundImage})`,
                minHeight: theme.heroBanner.config.height === 'small' ? '300px' : 
                           theme.heroBanner.config.height === 'medium' ? '500px' : '100vh'
              }}
            >
              <div className={`absolute inset-0 ${
                theme.heroBanner.config.overlay === 'gradient' ? 'bg-gradient-to-r from-black/50 to-transparent' :
                theme.heroBanner.config.overlay === 'solid' ? 'bg-black/50' : ''
              }`}></div>
              <div className="relative z-10 text-center text-white p-8">
                <h1 className="text-4xl md:text-6xl font-bold mb-4">
                  {theme.heroBanner.config.heading}
                </h1>
                <p className="text-xl md:text-2xl mb-8 opacity-90">
                  {theme.heroBanner.config.subheading}
                </p>
                {theme.heroBanner.config.ctaButton && (
                  <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100">
                    {theme.heroBanner.config.ctaButton.label}
                  </Button>
                )}
              </div>
            </div>

            {/* Layout Preview */}
            <div className="p-6">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Layout Preview</h2>
                <p className="text-gray-600">Preview of the theme layouts and components</p>
              </div>

              {/* Sample Content */}
              <div className="space-y-6">
                {/* Sample Article Feed */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <Card key={i} className="overflow-hidden">
                      <img 
                        src={`https://picsum.photos/400/250?random=${i + 10}`}
                        alt={`Sample article ${i}`}
                        className="w-full h-48 object-cover"
                      />
                      <CardContent className="p-4">
                        <h3 className="font-semibold text-gray-900 mb-2">
                          Sample Article Title {i}
                        </h3>
                        <p className="text-sm text-gray-600 mb-3">
                          This is a sample article description to show how content will look in this theme.
                        </p>
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <span>Category</span>
                          <span>2 hours ago</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Sample Call to Action */}
                <div 
                  className="rounded-lg p-8 text-center text-white"
                  style={{ backgroundColor: theme.styles.colors.primary }}
                >
                  <h3 className="text-2xl font-bold mb-2">Join Our Community</h3>
                  <p className="mb-4 opacity-90">Stay connected with the latest news and updates</p>
                  <Button variant="secondary" className="bg-white text-gray-900 hover:bg-gray-100">
                    Subscribe Now
                  </Button>
                </div>

                {/* Layout 1: Featured Content Section */}
                <div className="bg-gray-50 rounded-lg p-8">
                  <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Content</h2>
                    <p className="text-gray-600">Highlighted articles and important updates</p>
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="bg-white rounded-lg overflow-hidden shadow-md">
                      <img 
                        src="https://picsum.photos/600/300?random=20"
                        alt="Featured article"
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-6">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">Featured</span>
                          <span className="text-sm text-gray-500">2 hours ago</span>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3">Breaking News: Major Development</h3>
                        <p className="text-gray-600 mb-4">This is a featured article that showcases important news and developments in our community.</p>
                        <Button variant="outline" size="sm">Read More</Button>
                      </div>
                    </div>
                    <div className="space-y-4">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="bg-white rounded-lg p-4 shadow-md flex gap-4">
                          <img 
                            src={`https://picsum.photos/150/100?random=${20 + i}`}
                            alt={`Article ${i}`}
                            className="w-24 h-16 object-cover rounded"
                          />
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900 mb-1">Article Title {i}</h4>
                            <p className="text-sm text-gray-600 mb-2">Brief description of the article content...</p>
                            <span className="text-xs text-gray-500">{i} hours ago</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Layout 2: Statistics Section */}
                <div className="bg-white rounded-lg p-8 border border-gray-200">
                  <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Impact</h2>
                    <p className="text-gray-600">Numbers that matter to our community</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {[
                      { number: "50K+", label: "Active Readers", icon: "👥" },
                      { number: "1.2M", label: "Articles Published", icon: "📰" },
                      { number: "95%", label: "Reader Satisfaction", icon: "⭐" },
                      { number: "24/7", label: "News Coverage", icon: "🕐" }
                    ].map((stat, index) => (
                      <div key={index} className="text-center p-6 bg-gray-50 rounded-lg">
                        <div className="text-4xl mb-3">{stat.icon}</div>
                        <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
                        <div className="text-gray-600">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Layout 3: Newsletter Section */}
                <div 
                  className="rounded-lg p-8 text-center text-white"
                  style={{ 
                    background: `linear-gradient(135deg, ${theme.styles.colors.primary} 0%, ${theme.styles.colors.secondary} 100%)`
                  }}
                >
                  <div className="max-w-2xl mx-auto">
                    <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
                    <p className="text-lg mb-6 opacity-90">Get the latest news and updates delivered directly to your inbox</p>
                    <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                      <input 
                        type="email" 
                        placeholder="Enter your email"
                        className="flex-1 px-4 py-3 rounded-lg text-gray-900 placeholder-gray-500"
                      />
                      <Button className="bg-white text-gray-900 hover:bg-gray-100 px-8">
                        Subscribe
                      </Button>
                    </div>
                    <p className="text-sm mt-4 opacity-75">No spam, unsubscribe at any time</p>
                  </div>
                </div>

                {/* Layout 4: Team Section */}
                <div className="bg-gray-50 rounded-lg p-8">
                  <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
                    <p className="text-gray-600">The people behind the news</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                      { name: "Sarah Johnson", role: "Editor-in-Chief", image: "https://picsum.photos/200/200?random=30" },
                      { name: "Michael Chen", role: "Senior Reporter", image: "https://picsum.photos/200/200?random=31" },
                      { name: "Emily Rodriguez", role: "Content Manager", image: "https://picsum.photos/200/200?random=32" }
                    ].map((member, index) => (
                      <div key={index} className="text-center">
                        <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden">
                          <img 
                            src={member.image}
                            alt={member.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">{member.name}</h3>
                        <p className="text-gray-600 mb-3">{member.role}</p>
                        <div className="flex justify-center gap-2">
                          <Button variant="outline" size="sm">Twitter</Button>
                          <Button variant="outline" size="sm">LinkedIn</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Layout 5: Testimonials Section */}
                <div className="bg-white rounded-lg p-8 border border-gray-200">
                  <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">What Our Readers Say</h2>
                    <p className="text-gray-600">Trusted by thousands of readers worldwide</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[
                      { 
                        quote: "Albiz Media provides the most accurate and timely news coverage. I trust them completely.",
                        author: "John Smith",
                        role: "Business Owner",
                        rating: 5
                      },
                      { 
                        quote: "The quality of journalism here is outstanding. Always well-researched and balanced.",
                        author: "Maria Garcia",
                        role: "Journalist",
                        rating: 5
                      },
                      { 
                        quote: "I've been reading Albiz Media for years. They never disappoint with their coverage.",
                        author: "David Lee",
                        role: "Student",
                        rating: 5
                      }
                    ].map((testimonial, index) => (
                      <div key={index} className="bg-gray-50 rounded-lg p-6">
                        <div className="flex mb-4">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <span key={i} className="text-yellow-400">⭐</span>
                          ))}
                        </div>
                        <p className="text-gray-700 mb-4 italic">"{testimonial.quote}"</p>
                        <div className="border-t pt-4">
                          <div className="font-semibold text-gray-900">{testimonial.author}</div>
                          <div className="text-sm text-gray-600">{testimonial.role}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Preview */}
            <div 
              className="w-full px-6 py-8"
              style={{ 
                backgroundColor: theme.footer.styling.backgroundColor,
                color: theme.footer.styling.textColor 
              }}
            >
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="text-sm">
                  {theme.footer.config.copyright}
                </div>
                <div className="flex items-center gap-6">
                  {theme.footer.config.links.map((link: any, index: number) => (
                    <a key={index} href={link.href} className="text-sm hover:opacity-80 transition-opacity">
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
