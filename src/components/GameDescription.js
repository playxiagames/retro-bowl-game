'use client';

const GameDescription = ({ game, className = '', hideTitle = false }) => {
  if (!game) return null;

  return (
    <div className={`game-description bg-white dark:bg-slate-800 rounded-lg shadow-sm p-4 transition-colors ${className}`}>
      <div className="w-full mx-auto">
        
        {/* Game Title - 仅在hideTitle为false时显示 */}
        {!hideTitle && (
          <div className="mb-4">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1 text-left">{game.title}</h3>
            <p className="text-base text-gray-600 dark:text-gray-300 text-left">{game.description}</p>
          </div>
        )}

        {/* Game Stats */}
        <div className="flex flex-wrap gap-2 mb-4 text-sm">
          <div className="flex items-center bg-yellow-50 dark:bg-yellow-900/20 px-2 py-1 rounded-full">
            <span className="text-yellow-600 dark:text-yellow-400 mr-1">⭐</span>
            <span className="font-medium text-gray-900 dark:text-gray-100">{game.rating} Rating</span>
          </div>
          <div className="flex items-center bg-blue-50 dark:bg-blue-900/20 px-2 py-1 rounded-full">
            <span className="text-blue-600 dark:text-blue-400 mr-1">🎮</span>
            <span className="font-medium text-gray-900 dark:text-gray-100">{game.playCount > 1000000 ? `${(game.playCount/1000000).toFixed(1)}M` : `${Math.floor(game.playCount/1000)}K`} Plays</span>
          </div>
          <div className="flex items-center bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded-full">
            <span className="text-green-600 dark:text-green-400 mr-1">🏷️</span>
            <span className="font-medium text-gray-900 dark:text-gray-100 capitalize">{game.category}</span>
          </div>
        </div>

        {/* Game Tags */}
        {game.tags && game.tags.length > 0 && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-1">
              {game.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-full text-xs hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors cursor-pointer"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Long Description */}
        <div className="prose prose-sm max-w-none mb-6">
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-left">
            {game.longDescription}
          </p>
        </div>

        {/* How to Play */}
        {game.controls && game.controls.length > 0 && (
          <div className="mb-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 text-left">🎮 How to Play</h3>
            <div className="bg-gray-50 dark:bg-slate-700 rounded-lg p-4">
              <ul className="space-y-2">
                {game.controls.map((control, index) => (
                  <li key={index} className="flex items-start text-left">
                    <span className="flex-shrink-0 w-5 h-5 bg-blue-500 dark:bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold mr-2 mt-0.5">
                      {index + 1}
                    </span>
                    <span className="text-gray-700 dark:text-gray-300 text-sm">{control}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Game Tips */}
        {game.tips && game.tips.length > 0 && (
          <div className="mb-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 text-left">💡 Game Tips</h3>
            <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4">
              <ul className="space-y-2">
                {game.tips.map((tip, index) => (
                  <li key={index} className="flex items-start text-left">
                    <span className="flex-shrink-0 text-yellow-500 dark:text-yellow-400 mr-2 mt-0.5">💡</span>
                    <span className="text-gray-700 dark:text-gray-300 text-sm">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GameDescription; 