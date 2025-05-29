import { Component } from 'react'
import { Calendar, User, ExternalLink } from 'lucide-react';

export default class NewItem extends Component {
  formatDate = (dateString) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      }),
      time: date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit'
      })
    };
  };

  handleImageError = (e) => {
    e.target.src = "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=400&h=250&fit=crop";
  };

  render() {
    const { title, description, imageURL, newsURL, date, source, author } = this.props;
    const { date: formattedDate, time } = this.formatDate(date);

    return (
      <article
        // style={{height:"340px"}}
        className="mb-4 bg-white rounded-2xl  hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 overflow-hidden group">
        {/* Source badge */}
        <div className="absolute top-4 left-4 z-10">
          <span className="bg-gradient-to-r from-purple-600 to-purple-700 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
            {source}
          </span>
        </div>

        {/* Image */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={imageURL || "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=400&h=250&fit=crop"}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={this.handleImageError}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
        </div>

        {/* Content */}
        <div className="p-4 space-y-4">
          <h3 className="font-bold text-lg leading-tight text-gray-900 line-clamp-2 group-hover:text-purple-700 transition-colors">
            {title}
          </h3>

          <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
            {description || "No description available for this article."}
          </p>

          {/* Meta information */}
          <div className="flex flex-col space-y-2 pt-2 border-t border-gray-100">
            <div className="flex items-center text-xs text-gray-500 space-x-4">
              <div className="flex items-center space-x-1">
                <Calendar className="w-3 h-3" />
                <span>{formattedDate}</span>
              </div>
              <div className="flex items-center space-x-1">
                <span>{time}</span>
              </div>
            </div>

            {author && (
              <div className="flex items-center text-xs text-gray-500 space-x-1">
                <User className="w-3 h-3" />
                <span>By {author}</span>
              </div>
            )}
          </div>

          {/* Read more button */}
          <a
            href={newsURL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex text-decoration-none items-center justify-center w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold py-2 px-4 rounded-xl transition-all duration-200 space-x-2 group"
          >
            <span className=''>Read More</span>
            <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </a>
        </div>
      </article>
    );
  }
}