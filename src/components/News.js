import React, { Component } from 'react'
import NewItem from './NewItem'
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";
import Skeleton from './Skeleton';
import SignatureFooter from './SignatureFooter';
import axios from 'axios';
import { Search } from 'lucide-react';
import ErrorMessage from './Error';

const baseURL = process.env.REACT_APP_BACKEND_URL;

export class News extends Component {

  static defaultProps = {
    country: "in",
    pageSize: 8,
    category: "general",
    query: '',
    setProgress: () => { }
  }

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
    query: PropTypes.string,
    setProgress: PropTypes.func
  }

  constructor() {
    super();
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults: 0,
      error: null,
      loadingMore: false
    }
  }

  capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  // Single method to fetch news from backend
  fetchNews = async (query, category, page, pageSize) => {
    try {
      const { data } = await axios.post(`${baseURL}/api/news`, { 
        query, 
        category, 
        page, 
        pageSize 
      });
      
      return {
        articles: data.articles || [],
        totalResults: data.totalResults || 0
      };
      
    } catch (error) {
      console.error("Error fetching news:", error);
      throw new Error(error.response?.data?.message || error.message || 'Failed to fetch news');
    }
  };

  // Main method to load news (initial load or refresh)
  loadNews = async (pageNum = 1, append = false) => {
    try {
      if (!append) {
        this.setState({ loading: true, error: null });
      } else {
        this.setState({ loadingMore: true });
      }

      this.props.setProgress(30);
      const data = await this.fetchNews(this.props.query, this.props.category, pageNum, this.props.pageSize);
      this.props.setProgress(70);

      this.setState(prevState => ({
        articles: append ? [...prevState.articles, ...data.articles] : data.articles,
        totalResults: data.totalResults,
        page: pageNum,
        error: null
      }));

      this.props.setProgress(100);
    } catch (err) {
      this.setState({ 
        error: err.message || "Failed to load news articles",
        loading: false,
        loadingMore: false
      });
      this.props.setProgress(100);
    } finally {
      if (!this.state.error) {
        this.setState({ loading: false, loadingMore: false });
      }
    }
  };

  // Method for infinite scroll
  fetchMoreData = async () => {
    const nextPage = this.state.page + 1;
    await this.loadNews(nextPage, true);
  };

  // Retry loading after error
  retryLoad = () => {
    this.setState({ page: 1, error: null });
    this.loadNews(1, false);
  };

  async componentDidMount() {
    // Small delay to ensure smooth UI transition
    setTimeout(() => {
      this.loadNews(1, false);
    }, 300);
    document.title = `${this.capitalize(this.props.category)} - NewsRadar`;
  }

  async componentDidUpdate(prevProps) {
    // Reload news when query or category changes
    if (prevProps.query !== this.props.query || prevProps.category !== this.props.category) {
      this.setState({ page: 1, error: null });
      await this.loadNews(1, false);
    }

    // Update document title when category changes
    if (prevProps.category !== this.props.category) {
      document.title = `${this.capitalize(this.props.category)} - NewsRadar`;
    }
  }

  renderSkeletons = () => {
    const count = window.innerWidth <= 640 ? 1 : window.innerWidth <= 1024 ? 2 : 3;
    return Array.from({ length: count }, (_, i) => <Skeleton key={i} />);
  };

  render() {
    const { articles, loading, error, loadingMore, totalResults } = this.state;
    const { query, category } = this.props;
    const hasMore = articles.length < totalResults - 5;

    // Show error state if no articles and there's an error
    if (error && articles.length === 0) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 px-4 mt-20">
          <div className="container mx-auto max-w-6xl">
            <ErrorMessage message={error} onRetry={this.retryLoad} />
          </div>
        </div>
      );
    }

    return (
      <div className='relative mt-28'>
        <div className="overflow-hidden min-h-[87vh] pb-20">
          {/* Header */}
          <div className="text-center mb-8">
            <p className="text-2xl text-gray-700 font-medium">
              Top {this.capitalize(category)} Headlines
            </p>
            {query && (
              <p className="text-sm text-gray-500 mt-2">
                Search results for: "{query}"
              </p>
            )}
          </div>

          {/* Initial loading skeleton */}
          {loading && articles.length === 0 && (
            <div className="flex justify-center space-x-32 mx-4 my-4 w-[full]">
              {this.renderSkeletons()}
            </div>
          )}

          {/* Infinite scroll container */}
          <InfiniteScroll 
            className='overflow-hidden'
            dataLength={articles.length}
            next={this.fetchMoreData}
            hasMore={hasMore}
            loader={
              <div className="flex justify-center">
                <div className='space-x-32 my-4 w-[full] md:w-[64rem] row overflow-hidden'>
                  {this.renderSkeletons()}
                </div>
              </div>
            }
            endMessage={
              articles.length > 15 && (
                <p style={{ textAlign: 'center', marginBottom: "15px" }}>
                  <b>That's all the news for now. Check back later for updates!</b>
                </p>
              )
            }
          >
            {/* No articles found message */}
            {!loading && articles.length === 0 && !error && (
              <div className="text-center py-16">
                <div className="mb-4">
                  <Search className="w-16 h-16 text-gray-400 mx-auto" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No articles found</h3>
                <p className="text-gray-600">
                  {query
                    ? `No articles found for "${query}". Try a different search term.`
                    : "No articles available at the moment. Please try again later."
                  }
                </p>
              </div>
            )}

            {/* Articles grid */}
            <div className="flex justify-center">
              <div className="w-[24rem] md:w-[70rem] row overflow-hidden">
                {articles.map((element) => {
                  return (
                    <div className="col-md-4" key={element.url || element.title}>
                      <NewItem 
                        title={element.title} 
                        description={element.description} 
                        imageURL={element.urlToImage} 
                        newsURL={element.url} 
                        author={element.author} 
                        date={element.publishedAt} 
                        source={element.source?.name} 
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </InfiniteScroll>

          {/* Show error message for loading more articles */}
          {error && articles.length > 0 && (
            <div className="text-center py-4">
              <p className="text-red-600 mb-2">Failed to load more articles</p>
              <button 
                onClick={this.fetchMoreData}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Try Again
              </button>
            </div>
          )}
        </div>
        <SignatureFooter />
      </div>
    )
  }
}

export default News