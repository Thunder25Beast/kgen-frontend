import { useState } from 'react';
import WalletInput from './components/WalletInput';
import AnalyzeButton from './components/AnalyzeButton';
import TagList from './components/TagList';
import ScoreChart from './components/ScoreChart';
import BioCard from './components/BioCard';
import PortfolioChart from './components/PortfolioChart';
import ActivityChart from './components/ActivityChart';
import ThemeToggle from './components/ThemeToggle';
import { ThemeProvider } from './components/ThemeProvider';

const Navbar = () => (
  <nav className="w-full flex items-center justify-between px-6 py-4 bg-white/80 dark:bg-gray-900/80 shadow-md border-b border-gray-200 dark:border-gray-800 fixed top-0 left-0 z-40 backdrop-blur-md">
    <div className="flex items-center gap-2">
      <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
      </svg>
      <span className="text-xl font-bold text-gray-900 dark:text-gray-100 tracking-tight">Wallet Persona Analyzer</span>
    </div>
    <ThemeToggle />
  </nav>
);

const AppContent = () => {
  const [walletAddress, setWalletAddress] = useState('');
  const [personaData, setPersonaData] = useState(null);
  const [summaryData, setSummaryData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const mockFetchPersona = async (wallet) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return {
      wallet: wallet,
      tags: ['Collector', 'DeFi Trader', 'NFT Enthusiast', 'Early Adopter'],
      scores: {
        risk: 75,
        nft: 85,
        defi: 90,
        activity: 70
      },
      tradingVolume: '$125,000',
      nftCount: 47,
      protocolsUsed: 12
    };
  };

  const mockFetchSummary = async (wallet) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    return {
      bio: `This wallet belongs to an experienced DeFi trader and NFT collector. They show sophisticated on-chain behavior with high activity across multiple protocols. Their trading patterns suggest a risk-tolerant profile with a focus on yield farming and blue-chip NFT collections. The wallet demonstrates consistent engagement with emerging DeFi protocols and maintains a diversified portfolio across various asset classes.`
    };
  };

  const handleAnalyze = async () => {
    if (!walletAddress.trim()) {
      setError('Please enter a valid wallet address');
      return;
    }

    setIsLoading(true);
    setError(null);
    setPersonaData(null);
    setSummaryData(null);

    try {
      const [persona, summary] = await Promise.all([
        mockFetchPersona(walletAddress),
        mockFetchSummary(walletAddress)
      ]);

      setPersonaData(persona);
      setSummaryData(summary);
    } catch (err) {
      setError('Failed to analyze wallet. Please try again.');
      console.error('Analysis error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900 transition-colors duration-300 pt-20">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        {/* Enhanced Header */}
        <div className="text-center mb-16">
          <div className="mb-6">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 mb-4">
              <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 dark:from-gray-100 dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent mb-6">
            Wallet Persona Analyzer
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Discover the on-chain personality, trading patterns, and behavioral insights of any Ethereum wallet address using advanced analytics
          </p>
        </div>

        {/* Enhanced Input Section */}
        <div className="max-w-2xl mx-auto mb-16">
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 dark:border-gray-700/20 p-8">
            <WalletInput 
              value={walletAddress}
              onChange={setWalletAddress}
              error={error}
            />
            <div className="mt-8">
              <AnalyzeButton 
                onClick={handleAnalyze}
                isLoading={isLoading}
                disabled={!walletAddress.trim()}
              />
            </div>
          </div>
        </div>

        {/* Enhanced Results Section */}
        {(personaData || summaryData) && (
          <div className="max-w-7xl mx-auto space-y-8">
            {/* Profile Overview */}
            {personaData && (
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 dark:border-gray-700/20 p-8">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8 flex items-center">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 mr-3"></div>
                  Wallet Profile
                </h2>
                <TagList tags={personaData.tags} />
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
                  <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 rounded-2xl border border-blue-200/50 dark:border-blue-700/50">
                    <div className="text-3xl font-bold text-blue-700 dark:text-blue-300">{personaData.tradingVolume}</div>
                    <div className="text-sm text-blue-600/80 dark:text-blue-400/80 font-medium">Trading Volume</div>
                  </div>
                  <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/30 rounded-2xl border border-purple-200/50 dark:border-purple-700/50">
                    <div className="text-3xl font-bold text-purple-700 dark:text-purple-300">{personaData.nftCount}</div>
                    <div className="text-sm text-purple-600/80 dark:text-purple-400/80 font-medium">NFTs Owned</div>
                  </div>
                  <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30 rounded-2xl border border-green-200/50 dark:border-green-700/50">
                    <div className="text-3xl font-bold text-green-700 dark:text-green-300">{personaData.protocolsUsed}</div>
                    <div className="text-sm text-green-600/80 dark:text-green-400/80 font-medium">Protocols Used</div>
                  </div>
                </div>
              </div>
            )}

            {/* Charts Grid */}
            {personaData && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Risk & Activity Scores */}
                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 dark:border-gray-700/20 p-8">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 flex items-center">
                    <div className="w-6 h-6 rounded bg-gradient-to-r from-red-500 to-orange-500 mr-3"></div>
                    Risk & Activity Scores
                  </h2>
                  <ScoreChart scores={personaData.scores} />
                </div>

                {/* Portfolio Distribution */}
                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 dark:border-gray-700/20 p-8">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 flex items-center">
                    <div className="w-6 h-6 rounded bg-gradient-to-r from-green-500 to-blue-500 mr-3"></div>
                    Portfolio Distribution
                  </h2>
                  <PortfolioChart />
                </div>
              </div>
            )}

            {/* Activity Timeline */}
            {personaData && (
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 dark:border-gray-700/20 p-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 flex items-center">
                  <div className="w-6 h-6 rounded bg-gradient-to-r from-purple-500 to-pink-500 mr-3"></div>
                  Activity Timeline (6 Months)
                </h2>
                <ActivityChart />
              </div>
            )}

            {/* Bio Card */}
            {summaryData && (
              <BioCard bio={summaryData.bio} />
            )}
          </div>
        )}

        {/* Enhanced Loading State */}
        {isLoading && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 dark:border-gray-700/20 p-16 text-center">
              <div className="flex justify-center mb-8">
                <div className="relative">
                  <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200 dark:border-blue-800"></div>
                  <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent absolute top-0 left-0"></div>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-lg font-medium">Analyzing wallet patterns...</p>
              <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">This may take a few moments</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const App = () => {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
};

export default App;
