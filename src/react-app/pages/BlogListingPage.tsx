import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useParams } from "react-router-dom";
import { Calendar, Clock, ArrowRight, Search } from "lucide-react";
import { blogPosts, getCategories } from "../data/blogPosts";

function BlogListingPage() {
  const { t } = useTranslation();
  const { lang } = useParams<{ lang: string }>();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const categories = getCategories();

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = !selectedCategory || post.category === selectedCategory;
    const matchesSearch = !searchQuery ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="min-h-[400px] sm:min-h-[450px] flex items-center justify-center relative overflow-hidden pt-24 sm:pt-28 lg:pt-32 pb-12 sm:pb-14 lg:pb-16 px-4 sm:px-6 lg:px-8">
        {/* Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary-light to-accent"></div>
          {/* Grid Overlay */}
          <div
            className="absolute inset-0 z-[2] opacity-100"
            style={{
              backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)',
              backgroundSize: '50px 50px'
            }}
          ></div>
        </div>

        {/* Content */}
        <div className="max-w-[900px] text-center relative z-10 animate-fade-in-up">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-[20px] border border-white/30 px-6 py-2.5 rounded-full text-sm font-semibold text-white mb-8 shadow-[0_4px_16px_rgba(0,0,0,0.2)] animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <span className="w-2 h-2 bg-accent rounded-full animate-pulse-slow"></span>
            {t('blog.hero.badge')}
          </div>

          {/* Title */}
          <h1 className="font-[family-name:var(--font-display)] text-[clamp(2.5rem,6vw,4.5rem)] font-extrabold leading-[1.1] mb-6 text-white drop-shadow-[0_4px_20px_rgba(0,0,0,0.3)] animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            {t('blog.hero.title')}
            <span className="bg-gradient-to-br from-accent-light to-white bg-clip-text text-transparent"> {t('blog.hero.titleGradient')}</span>
          </h1>

          {/* Subtitle */}
          <p className="text-[clamp(1rem,2vw,1.25rem)] leading-[1.7] text-white/95 drop-shadow-[0_2px_12px_rgba(0,0,0,0.3)] mb-8 max-w-[600px] mx-auto animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            {t('blog.hero.subtitle')}
          </p>

          {/* Search Bar */}
          <div className="max-w-[500px] mx-auto animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60" size={20} />
              <input
                type="text"
                placeholder={t('blog.search.placeholder')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white/15 backdrop-blur-[20px] border border-white/30 rounded-2xl text-white placeholder:text-white/60 focus:outline-none focus:border-white/50 transition-all duration-300"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Blog Content Section */}
      <section className="py-12 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto">
        {/* Category Filters */}
        <div className="flex flex-wrap gap-3 mb-12 justify-center">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-5 py-2.5 rounded-full font-[family-name:var(--font-body)] font-semibold text-sm transition-all duration-300 ${
              !selectedCategory
                ? "bg-gradient-to-br from-primary to-primary-light text-white shadow-[0_4px_16px_rgba(13,106,108,0.3)]"
                : "bg-white border border-[#0D6A6C]/20 text-navy hover:border-accent hover:text-accent"
            }`}
          >
            {t('blog.categories.all')}
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-5 py-2.5 rounded-full font-[family-name:var(--font-body)] font-semibold text-sm transition-all duration-300 ${
                selectedCategory === category
                  ? "bg-gradient-to-br from-primary to-primary-light text-white shadow-[0_4px_16px_rgba(13,106,108,0.3)]"
                  : "bg-white border border-[#0D6A6C]/20 text-navy hover:border-accent hover:text-accent"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Blog Grid */}
        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, index) => (
              <article
                key={post.id}
                className="group bg-white/70 backdrop-blur-[20px] border border-[#0D6A6C]/10 rounded-3xl overflow-hidden transition-all duration-400 animate-fade-in-up hover:-translate-y-2 hover:shadow-[0_12px_48px_rgba(0,0,0,0.16)] hover:border-accent"
                style={{ animationDelay: `${0.1 * (index + 1)}s` }}
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden bg-gradient-to-br from-primary/20 to-accent/20">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-6xl opacity-30">
                      {post.category === "Technology" && "💻"}
                      {post.category === "Compliance" && "🔒"}
                      {post.category === "Patient Care" && "❤️"}
                      {post.category === "Practice Management" && "📊"}
                      {post.category === "Mental Health" && "🧠"}
                    </div>
                  </div>
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1.5 bg-white/90 backdrop-blur-[10px] rounded-full text-xs font-semibold text-primary">
                      {post.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Meta */}
                  <div className="flex items-center gap-4 text-sm text-[#8B95A5] mb-3">
                    <span className="flex items-center gap-1.5">
                      <Calendar size={14} />
                      {formatDate(post.publishedAt)}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock size={14} />
                      {post.readTime} {t('blog.readTime')}
                    </span>
                  </div>

                  {/* Title */}
                  <h2 className="font-[family-name:var(--font-display)] text-xl font-bold text-navy mb-3 line-clamp-2 group-hover:text-accent transition-colors duration-300">
                    {post.title}
                  </h2>

                  {/* Excerpt */}
                  <p className="text-[#8B95A5] text-sm leading-relaxed mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>

                  {/* Author & Link */}
                  <div className="flex items-center justify-between pt-4 border-t border-[#0D6A6C]/10">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent/30 to-primary/30 flex items-center justify-center text-primary text-xs font-bold">
                        {post.author.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <span className="text-sm text-navy font-medium">{post.author.name}</span>
                    </div>
                    <Link
                      to={`/${lang}/blog/${post.slug}`}
                      className="flex items-center gap-1.5 text-accent font-semibold text-sm transition-all duration-300 group-hover:gap-2.5"
                    >
                      {t('blog.readMore')}
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="font-[family-name:var(--font-display)] text-2xl font-bold text-navy mb-2">
              {t('blog.noResults.title')}
            </h3>
            <p className="text-[#8B95A5]">
              {t('blog.noResults.message')}
            </p>
          </div>
        )}
      </section>

      {/* Newsletter Section */}
      <section className="py-12 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary to-primary-light relative overflow-hidden">
        {/* Floating Orb Effect */}
        <div className="absolute -top-1/2 -right-1/5 w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(0,217,255,0.3)_0%,transparent_70%)] animate-[float_15s_ease-in-out_infinite]"></div>

        <div className="max-w-[600px] mx-auto text-center relative z-10">
          <h2 className="font-[family-name:var(--font-display)] text-[clamp(2rem,4vw,3rem)] font-extrabold text-white mb-4 leading-[1.2]">
            {t('blog.newsletter.title')}
          </h2>
          <p className="text-lg text-white/90 mb-8">
            {t('blog.newsletter.subtitle')}
          </p>
          <form className="flex flex-col sm:flex-row gap-4" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder={t('blog.newsletter.placeholder')}
              className="flex-1 px-6 py-4 rounded-2xl bg-white/15 backdrop-blur-[10px] border border-white/30 text-white placeholder:text-white/60 focus:outline-none focus:border-white/50 transition-all duration-300"
            />
            <button
              type="submit"
              className="px-8 py-4 bg-white text-primary font-semibold rounded-2xl transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(0,0,0,0.2)]"
            >
              {t('blog.newsletter.button')}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}

export default BlogListingPage;
