import { useEffect, useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Link, useParams } from "react-router-dom";
import { Calendar, Clock, ArrowLeft, Share2, Twitter, Linkedin, Facebook, Tag, ChevronRight, BookOpen } from "lucide-react";
import { getBlogPostBySlug, getRecentPosts } from "../data/blogPosts";
import { parseMarkdown } from "../utils/markdownParser";

function BlogDetailsPage() {
  const { t } = useTranslation();
  const { lang, slug } = useParams<{ lang: string; slug: string }>();
  const [readingProgress, setReadingProgress] = useState(0);
  const articleRef = useRef<HTMLElement>(null);

  const post = slug ? getBlogPostBySlug(slug) : undefined;
  const recentPosts = getRecentPosts(3).filter(p => p.slug !== slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  // Reading progress tracker
  useEffect(() => {
    const handleScroll = () => {
      if (!articleRef.current) return;

      const article = articleRef.current;
      const articleTop = article.offsetTop;
      const articleHeight = article.offsetHeight;
      const windowHeight = window.innerHeight;
      const scrollY = window.scrollY;

      const start = articleTop - windowHeight;
      const end = articleTop + articleHeight - windowHeight;
      const progress = Math.min(Math.max((scrollY - start) / (end - start), 0), 1);

      setReadingProgress(progress * 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const title = post?.title || '';

    switch (platform) {
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`, '_blank');
        break;
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'copy':
        navigator.clipboard.writeText(url);
        break;
    }
  };

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-24 bg-gradient-to-b from-[#FAFAF9] to-white">
        <div className="text-center px-4">
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
            <BookOpen size={40} className="text-primary" />
          </div>
          <h1 className="font-[family-name:var(--font-display)] text-3xl font-bold text-navy mb-4">
            {t('blog.notFound.title')}
          </h1>
          <p className="text-[#8B95A5] mb-8 max-w-md">
            {t('blog.notFound.message')}
          </p>
          <Link
            to={`/${lang}/blog`}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-br from-primary to-primary-light text-white font-semibold rounded-2xl transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(13,106,108,0.3)]"
          >
            <ArrowLeft size={18} />
            {t('blog.backToBlog')}
          </Link>
        </div>
      </div>
    );
  }

  const parsedContent = parseMarkdown(post.content);

  return (
    <div className="bg-[#FAFAF9]">
      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-transparent z-[1001]">
        <div
          className="h-full bg-gradient-to-r from-accent via-primary-light to-primary transition-all duration-150 ease-out"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 sm:pt-24 lg:pt-28">
        {/* Background with gradient and pattern */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[#063B3C] via-primary to-[#0A5D5E]"></div>
          {/* Subtle noise texture */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            }}
          ></div>
          {/* Decorative gradient orbs */}
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-accent/20 rounded-full blur-[100px]"></div>
          <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-primary-light/30 rounded-full blur-[80px]"></div>
        </div>

        <div className="relative z-10 max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20 lg:pb-24">
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center gap-2 text-sm text-white/60 mb-8 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <Link to={`/${lang}/blog`} className="hover:text-white transition-colors">
              {t('nav.blog')}
            </Link>
            <ChevronRight size={14} />
            <span className="text-white/80">{post.category}</span>
          </nav>

          {/* Category Badge */}
          <div
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full text-sm font-medium text-white mb-6 animate-fade-in"
            style={{ animationDelay: '0.15s' }}
          >
            <span className="w-2 h-2 bg-accent rounded-full animate-pulse"></span>
            {post.category}
          </div>

          {/* Title */}
          <h1
            className="font-[family-name:var(--font-display)] text-[clamp(2rem,4.5vw,3.25rem)] font-extrabold leading-[1.15] mb-8 text-white max-w-[900px] animate-fade-in-up"
            style={{ animationDelay: '0.2s' }}
          >
            {post.title}
          </h1>

          {/* Meta Row */}
          <div
            className="flex flex-wrap items-center gap-6 animate-fade-in-up"
            style={{ animationDelay: '0.3s' }}
          >
            {/* Author */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent/40 to-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center text-white font-semibold text-sm shadow-lg">
                {post.author.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <div className="font-semibold text-white">{post.author.name}</div>
                <div className="text-sm text-white/60">{post.author.role}</div>
              </div>
            </div>

            {/* Divider */}
            <div className="hidden sm:block w-px h-10 bg-white/20"></div>

            {/* Date & Read Time */}
            <div className="flex items-center gap-5 text-white/80">
              <span className="flex items-center gap-2 text-sm">
                <Calendar size={15} className="text-accent" />
                {formatDate(post.publishedAt)}
              </span>
              <span className="flex items-center gap-2 text-sm">
                <Clock size={15} className="text-accent" />
                {post.readTime} {t('blog.readTime')}
              </span>
            </div>
          </div>
        </div>

        {/* Wave separator */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" preserveAspectRatio="none" className="w-full h-[30px] sm:h-[40px] lg:h-[60px]">
            <path d="M0 60V30C240 10 480 0 720 0s480 10 720 30v30H0z" fill="#FAFAF9"/>
          </svg>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-12 lg:gap-16">
            {/* Main Content */}
            <article
              ref={articleRef}
              className="animate-fade-in-up"
              style={{ animationDelay: '0.4s' }}
            >
              {/* Article Body */}
              <div
                className="article-content"
                dangerouslySetInnerHTML={{ __html: parsedContent }}
              />

              {/* Tags Section */}
              <div className="mt-16 pt-8 border-t-2 border-[#0D6A6C]/10">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="flex items-center gap-2 text-primary font-medium mr-2">
                    <Tag size={18} />
                    {t('blog.tags') || 'Topics'}:
                  </span>
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-4 py-2 bg-white border border-[#0D6A6C]/15 rounded-full text-sm font-medium text-navy/80 hover:border-accent hover:text-accent transition-all duration-300 cursor-default"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Share Section */}
              <div className="mt-8 pt-8 border-t-2 border-[#0D6A6C]/10">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <span className="flex items-center gap-2 text-navy font-semibold">
                    <Share2 size={18} className="text-primary" />
                    {t('blog.share')}
                  </span>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleShare('twitter')}
                      className="group w-11 h-11 rounded-xl bg-white border border-[#0D6A6C]/10 flex items-center justify-center text-[#1DA1F2] transition-all duration-300 hover:bg-[#1DA1F2] hover:border-[#1DA1F2] hover:text-white hover:scale-110 hover:shadow-lg"
                    >
                      <Twitter size={18} />
                    </button>
                    <button
                      onClick={() => handleShare('linkedin')}
                      className="group w-11 h-11 rounded-xl bg-white border border-[#0D6A6C]/10 flex items-center justify-center text-[#0A66C2] transition-all duration-300 hover:bg-[#0A66C2] hover:border-[#0A66C2] hover:text-white hover:scale-110 hover:shadow-lg"
                    >
                      <Linkedin size={18} />
                    </button>
                    <button
                      onClick={() => handleShare('facebook')}
                      className="group w-11 h-11 rounded-xl bg-white border border-[#0D6A6C]/10 flex items-center justify-center text-[#1877F2] transition-all duration-300 hover:bg-[#1877F2] hover:border-[#1877F2] hover:text-white hover:scale-110 hover:shadow-lg"
                    >
                      <Facebook size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </article>

            {/* Sidebar */}
            <aside className="lg:sticky lg:top-24 lg:self-start space-y-6 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
              {/* Author Card */}
              <div className="bg-white rounded-2xl p-6 shadow-[0_4px_24px_rgba(0,0,0,0.06)] border border-[#0D6A6C]/5">
                <div className="flex items-center gap-2 text-xs font-semibold text-primary/60 uppercase tracking-wider mb-4">
                  <div className="w-8 h-px bg-gradient-to-r from-primary to-accent"></div>
                  {t('blog.aboutAuthor')}
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/10 via-accent/10 to-primary-light/10 flex items-center justify-center text-primary font-bold text-lg border border-primary/10 flex-shrink-0">
                    {post.author.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <div className="font-semibold text-navy text-lg">{post.author.name}</div>
                    <div className="text-sm text-[#8B95A5] mt-0.5">{post.author.role}</div>
                  </div>
                </div>
              </div>

              {/* Recent Posts */}
              {recentPosts.length > 0 && (
                <div className="bg-white rounded-2xl p-6 shadow-[0_4px_24px_rgba(0,0,0,0.06)] border border-[#0D6A6C]/5">
                  <div className="flex items-center gap-2 text-xs font-semibold text-primary/60 uppercase tracking-wider mb-5">
                    <div className="w-8 h-px bg-gradient-to-r from-primary to-accent"></div>
                    {t('blog.recentPosts')}
                  </div>
                  <div className="flex flex-col gap-5">
                    {recentPosts.map((recentPost, idx) => (
                      <Link
                        key={recentPost.id}
                        to={`/${lang}/blog/${recentPost.slug}`}
                        className="group block"
                      >
                        <div className="flex items-start gap-3">
                          <span className="flex-shrink-0 w-7 h-7 rounded-lg bg-gradient-to-br from-accent/10 to-primary/10 flex items-center justify-center text-xs font-bold text-primary">
                            {idx + 1}
                          </span>
                          <div>
                            <div className="text-xs text-[#8B95A5] mb-1">
                              {formatDate(recentPost.publishedAt)}
                            </div>
                            <div className="font-medium text-navy group-hover:text-accent transition-colors duration-300 line-clamp-2 leading-snug">
                              {recentPost.title}
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Newsletter CTA */}
              <div className="bg-gradient-to-br from-primary to-primary-light rounded-2xl p-6 text-white relative overflow-hidden">
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-accent/20 rounded-full blur-2xl"></div>
                <div className="relative z-10">
                  <h4 className="font-[family-name:var(--font-display)] font-bold text-lg mb-2">
                    {t('blog.newsletter.title')}
                  </h4>
                  <p className="text-white/80 text-sm mb-4">
                    {t('blog.newsletter.subtitle')}
                  </p>
                  <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
                    <input
                      type="email"
                      placeholder={t('blog.newsletter.placeholder')}
                      className="w-full px-4 py-3 rounded-xl bg-white/15 border border-white/20 text-white placeholder:text-white/50 text-sm focus:outline-none focus:border-white/40 transition-colors"
                    />
                    <button
                      type="submit"
                      className="w-full py-3 bg-white text-primary font-semibold rounded-xl text-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
                    >
                      {t('blog.newsletter.button')}
                    </button>
                  </form>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Related Posts CTA */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-white border-t border-[#0D6A6C]/5">
        <div className="max-w-[800px] mx-auto text-center">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-primary/60 uppercase tracking-wider mb-4">
            <div className="w-8 h-px bg-gradient-to-r from-primary to-accent"></div>
            Continue Reading
            <div className="w-8 h-px bg-gradient-to-l from-primary to-accent"></div>
          </div>
          <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-bold text-navy mb-4">
            {t('blog.exploreMore')}
          </h2>
          <p className="text-[#8B95A5] mb-8 max-w-lg mx-auto">
            {t('blog.exploreMoreSubtitle')}
          </p>
          <Link
            to={`/${lang}/blog`}
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-br from-primary to-primary-light text-white font-semibold rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(13,106,108,0.3)]"
          >
            {t('blog.viewAllPosts')}
            <ArrowLeft size={18} className="rotate-180" />
          </Link>
        </div>
      </section>

      {/* Article Content Styles */}
      <style>{`
        .article-content {
          font-size: 1.125rem;
          line-height: 1.8;
          color: #1a2b3c;
        }

        .article-h2 {
          font-family: var(--font-display);
          font-size: 1.75rem;
          font-weight: 700;
          color: #0F1419;
          margin-top: 3rem;
          margin-bottom: 1.25rem;
          padding-bottom: 0.75rem;
          border-bottom: 2px solid rgba(13, 106, 108, 0.1);
          position: relative;
        }

        .article-h2::before {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 60px;
          height: 2px;
          background: linear-gradient(to right, #0A4D4E, #00D9FF);
        }

        .article-h3 {
          font-family: var(--font-display);
          font-size: 1.35rem;
          font-weight: 600;
          color: #0A4D4E;
          margin-top: 2.25rem;
          margin-bottom: 1rem;
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .article-h3::before {
          content: '';
          width: 4px;
          height: 1.35rem;
          background: linear-gradient(to bottom, #00D9FF, #0A4D4E);
          border-radius: 2px;
          flex-shrink: 0;
        }

        .article-p {
          margin-bottom: 1.5rem;
          color: #374151;
        }

        .article-p:first-of-type {
          font-size: 1.25rem;
          line-height: 1.7;
          color: #1a2b3c;
        }

        .article-ul,
        .article-ol {
          margin: 1.5rem 0;
          padding-left: 0;
          list-style: none;
        }

        .article-li {
          position: relative;
          padding-left: 2rem;
          margin-bottom: 0.875rem;
          line-height: 1.7;
        }

        .article-ul .article-li::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0.65rem;
          width: 8px;
          height: 8px;
          background: linear-gradient(135deg, #00D9FF, #0A4D4E);
          border-radius: 50%;
        }

        .article-ol {
          counter-reset: list-counter;
        }

        .article-ol .article-li {
          counter-increment: list-counter;
        }

        .article-ol .article-li::before {
          content: counter(list-counter);
          position: absolute;
          left: 0;
          top: 0.1rem;
          width: 1.5rem;
          height: 1.5rem;
          background: linear-gradient(135deg, rgba(0, 217, 255, 0.15), rgba(10, 77, 78, 0.15));
          border-radius: 0.375rem;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.875rem;
          font-weight: 600;
          color: #0A4D4E;
        }

        .article-strong {
          font-weight: 600;
          color: #0F1419;
        }

        .article-em {
          font-style: italic;
          color: #374151;
        }

        .article-code {
          font-family: 'SF Mono', 'Fira Code', monospace;
          font-size: 0.875em;
          padding: 0.2em 0.4em;
          background: rgba(10, 77, 78, 0.08);
          border-radius: 0.25rem;
          color: #0A4D4E;
        }

        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
          opacity: 0;
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
}

export default BlogDetailsPage;
