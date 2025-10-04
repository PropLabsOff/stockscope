import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

const NewsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 1200px;
  margin: 0 auto;
`

const Title = styled.h1`
  color: ${props => props.theme.text};
  font-size: 28px;
  font-weight: 600;
  margin: 0;
`

const NewsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 20px;
`

const NewsCard = styled.article`
  background-color: ${props => props.theme.surface};
  border: 1px solid ${props => props.theme.border};
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px ${props => props.theme.shadow};
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 16px ${props => props.theme.shadow};
  }
`

const NewsImage = styled.div`
  height: 200px;
  background: linear-gradient(135deg, ${props => props.theme.primary}20, ${props => props.theme.primary}40);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 48px;
  color: ${props => props.theme.primary};
`

const NewsContent = styled.div`
  padding: 20px;
`

const NewsTitle = styled.h3`
  color: ${props => props.theme.text};
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 12px;
  line-height: 1.4;
`

const NewsExcerpt = styled.p`
  color: ${props => props.theme.textSecondary};
  font-size: 14px;
  line-height: 1.6;
  margin-bottom: 16px;
`

const NewsMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  color: ${props => props.theme.textSecondary};
`

const NewsSource = styled.span`
  background-color: ${props => props.theme.primary}20;
  color: ${props => props.theme.primary};
  padding: 4px 8px;
  border-radius: 4px;
  font-weight: 500;
`

const NewsDate = styled.span``

const ReadMoreButton = styled.button`
  background-color: ${props => props.theme.primary};
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease;
  
  &:hover {
    background-color: ${props => props.theme.primaryHover};
  }
`

const LoadingText = styled.div`
  text-align: center;
  color: ${props => props.theme.textSecondary};
  padding: 40px;
  font-size: 16px;
`

const FilterContainer = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
  flex-wrap: wrap;
`

const FilterButton = styled.button<{ active: boolean }>`
  padding: 8px 16px;
  border: 1px solid ${props => props.active ? props.theme.primary : props.theme.border};
  border-radius: 20px;
  background-color: ${props => props.active ? props.theme.primary : 'transparent'};
  color: ${props => props.active ? 'white' : props.theme.text};
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s ease;
  
  &:hover {
    border-color: ${props => props.theme.primary};
    background-color: ${props => props.active ? props.theme.primary : props.theme.primary}20;
  }
`

interface NewsArticle {
  id: string
  title: string
  excerpt: string
  source: string
  publishedAt: string
  url: string
  category: string
}

const News: React.FC = () => {
  const [articles, setArticles] = useState<NewsArticle[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | 'market' | 'tech' | 'finance'>('all')

  useEffect(() => {
    // Simulate fetching news data
    const mockArticles: NewsArticle[] = [
      {
        id: '1',
        title: 'Stock Market Reaches New All-Time High Amid Economic Recovery',
        excerpt: 'Major indices continue their upward trajectory as investors remain optimistic about economic recovery and corporate earnings growth.',
        source: 'MarketWatch',
        publishedAt: '2024-01-15T10:30:00Z',
        url: '#',
        category: 'market'
      },
      {
        id: '2',
        title: 'Tech Giants Report Strong Q4 Earnings',
        excerpt: 'Apple, Microsoft, and Google parent Alphabet all exceeded expectations in their latest quarterly reports.',
        source: 'TechCrunch',
        publishedAt: '2024-01-15T09:15:00Z',
        url: '#',
        category: 'tech'
      },
      {
        id: '3',
        title: 'Federal Reserve Signals Potential Rate Cuts',
        excerpt: 'Central bank officials hint at possible monetary policy adjustments in response to inflation trends.',
        source: 'Reuters',
        publishedAt: '2024-01-15T08:45:00Z',
        url: '#',
        category: 'finance'
      },
      {
        id: '4',
        title: 'Energy Sector Sees Renewed Interest',
        excerpt: 'Oil and gas companies benefit from geopolitical tensions and supply chain disruptions.',
        source: 'Bloomberg',
        publishedAt: '2024-01-15T07:20:00Z',
        url: '#',
        category: 'market'
      },
      {
        id: '5',
        title: 'Cryptocurrency Market Shows Volatility',
        excerpt: 'Bitcoin and other digital assets experience significant price swings as regulatory clarity remains uncertain.',
        source: 'CoinDesk',
        publishedAt: '2024-01-15T06:30:00Z',
        url: '#',
        category: 'finance'
      },
      {
        id: '6',
        title: 'Healthcare Stocks Rally on Drug Approval News',
        excerpt: 'Pharmaceutical companies see gains following FDA approval of new treatments.',
        source: 'FierceBiotech',
        publishedAt: '2024-01-15T05:45:00Z',
        url: '#',
        category: 'tech'
      }
    ]

    const timer = setTimeout(() => {
      setArticles(mockArticles)
      setLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  const filteredArticles = filter === 'all' 
    ? articles 
    : articles.filter(article => article.category === filter)

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const handleReadMore = (url: string) => {
    // In a real app, this would open the article in a new window
    console.log('Opening article:', url)
  }

  if (loading) {
    return (
      <NewsContainer>
        <Title>Market News</Title>
        <LoadingText>Loading latest news...</LoadingText>
      </NewsContainer>
    )
  }

  return (
    <NewsContainer>
      <Title>Market News</Title>

      <FilterContainer>
        <FilterButton active={filter === 'all'} onClick={() => setFilter('all')}>
          All News ({articles.length})
        </FilterButton>
        <FilterButton active={filter === 'market'} onClick={() => setFilter('market')}>
          Market ({articles.filter(a => a.category === 'market').length})
        </FilterButton>
        <FilterButton active={filter === 'tech'} onClick={() => setFilter('tech')}>
          Technology ({articles.filter(a => a.category === 'tech').length})
        </FilterButton>
        <FilterButton active={filter === 'finance'} onClick={() => setFilter('finance')}>
          Finance ({articles.filter(a => a.category === 'finance').length})
        </FilterButton>
      </FilterContainer>

      <NewsGrid>
        {filteredArticles.map((article) => (
          <NewsCard key={article.id}>
            <NewsImage>📰</NewsImage>
            <NewsContent>
              <NewsTitle>{article.title}</NewsTitle>
              <NewsExcerpt>{article.excerpt}</NewsExcerpt>
              <NewsMeta>
                <NewsSource>{article.source}</NewsSource>
                <NewsDate>{formatDate(article.publishedAt)}</NewsDate>
              </NewsMeta>
              <div style={{ marginTop: '12px' }}>
                <ReadMoreButton onClick={() => handleReadMore(article.url)}>
                  Read More
                </ReadMoreButton>
              </div>
            </NewsContent>
          </NewsCard>
        ))}
      </NewsGrid>
    </NewsContainer>
  )
}

export default News