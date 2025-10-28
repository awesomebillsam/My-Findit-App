
import React, { useState } from 'react';
import { Item, ItemStatus, User } from './types';
import Header from './components/Header';
import Feed from './components/Feed';
import ReportForm from './components/ReportForm';
import BottomNavBar from './components/BottomNavBar';
import ProfilePage from './components/ProfilePage';

// Mock User Data
const users: User[] = [
  { id: 'u1', username: 'JaneDoe', avatarUrl: 'https://i.pravatar.cc/150?u=jane_doe', email: 'jane.d@example.com', phone: '555-123-4567' },
  { id: 'u2', username: 'JohnSmith', avatarUrl: 'https://i.pravatar.cc/150?u=john_smith' },
  { id: 'u3', username: 'AlexRay', avatarUrl: 'https://i.pravatar.cc/150?u=alex_ray' },
];

const currentUser = users[0]; // Simulate a logged-in user

// Mock Item Data
const initialItems: Item[] = [
  {
    id: '1',
    name: 'Set of keys on a red lanyard',
    description: 'Looks like a set of house keys and a car key. The lanyard has a university logo on it.',
    status: ItemStatus.Found,
    imageUrl: 'https://picsum.photos/seed/keys/400/300',
    location: { latitude: 34.0522, longitude: -118.2437, text: 'Downtown Los Angeles' },
    reportedAt: new Date(Date.now() - 3600 * 1000 * 2), // 2 hours ago
    author: users[1],
    region: 'America'
  },
  {
    id: '2',
    name: 'Black leather wallet',
    description: 'A simple black wallet, feels like it has cards inside but I have not opened it.',
    status: ItemStatus.Lost,
    imageUrl: 'https://picsum.photos/seed/wallet/400/300',
    location: { latitude: 40.7128, longitude: -74.0060, text: 'Central Park, NYC' },
    reportedAt: new Date(Date.now() - 3600 * 1000 * 24), // 1 day ago
    author: currentUser,
    region: 'America'
  },
  {
    id: '3',
    name: 'Blue Hydroflask water bottle',
    description: 'Covered in various stickers, including a national park sticker and a cartoon cat.',
    status: ItemStatus.Found,
    imageUrl: 'https://picsum.photos/seed/bottle/400/300',
    location: { latitude: 41.8781, longitude: -87.6298, text: 'Millennium Park, Chicago' },
    reportedAt: new Date(Date.now() - 3600 * 1000 * 5), // 5 hours ago
    author: users[2],
    region: 'Local'
  },
  {
    id: '4',
    name: 'Missing Person: John Appleseed',
    description: 'Last seen near the city library on 5th Ave. Wearing a blue jacket and jeans. If you have any information, please contact local authorities.',
    status: ItemStatus.Lost,
    imageUrl: 'https://picsum.photos/seed/person/400/300',
    location: { latitude: 51.5072, longitude: -0.1276, text: 'London, UK' },
    reportedAt: new Date(Date.now() - 3600 * 1000 * 72), // 3 days ago
    author: users[1],
    region: 'Europe'
  },
   {
    id: '5',
    name: 'Diamond Engagement Ring',
    description: 'Gold band with a single diamond. Lost somewhere in the shopping district.',
    status: ItemStatus.Lost,
    imageUrl: 'https://picsum.photos/seed/ring/400/300',
    location: { latitude: 35.6895, longitude: 139.6917, text: 'Shibuya, Tokyo' },
    reportedAt: new Date(Date.now() - 3600 * 1000 * 8),
    author: users[2],
    region: 'Asia'
  },
  {
    id: '6',
    name: 'Sony A7IV Camera with lens',
    description: 'Black camera body with a 24-70mm GM lens attached. Was in a black camera bag.',
    status: ItemStatus.Lost,
    imageUrl: 'https://picsum.photos/seed/camera/400/300',
    location: { latitude: -33.8688, longitude: 151.2093, text: 'Sydney, Australia' },
    reportedAt: new Date(Date.now() - 3600 * 1000 * 48),
    author: currentUser,
    region: 'Local'
  },
   {
    id: '7',
    name: 'Found: iPhone 14 Pro',
    description: 'Found an iPhone with a cracked screen protector. It is locked. Handing it to the main office.',
    status: ItemStatus.Found,
    imageUrl: 'https://picsum.photos/seed/iphone/400/300',
    location: { latitude: 1.3521, longitude: 103.8198, text: 'Singapore' },
    reportedAt: new Date(Date.now() - 3600 * 1000 * 1),
    author: users[1],
    region: 'Asia'
  },
];

type View = 'feed' | 'report' | 'profile';

function App() {
  const [items, setItems] = useState<Item[]>(initialItems);
  const [currentView, setCurrentView] = useState<View>('feed');
  
  const handleAddItem = (newItemData: Omit<Item, 'id' | 'reportedAt' | 'author'>) => {
    const newItem: Item = {
        ...newItemData,
        id: new Date().toISOString(),
        reportedAt: new Date(),
        author: currentUser,
    };
    setItems(prevItems => [newItem, ...prevItems]);
    setCurrentView('feed');
  };

  const renderContent = () => {
    switch(currentView) {
        case 'report':
            return <ReportForm onAddItem={handleAddItem} onBack={() => setCurrentView('feed')} />;
        case 'profile':
            return <ProfilePage user={currentUser} items={items} onBack={() => setCurrentView('feed')} />;
        case 'feed':
        default:
            return (
                <>
                    <Header title="FindIt" />
                    <Feed items={items} />
                </>
            );
    }
  };
  
  const showNavBar = currentView === 'feed' || currentView === 'profile';

  return (
    <div className="max-w-md mx-auto bg-slate-50 min-h-screen font-sans antialiased relative pb-24">
      <main>
        {renderContent()}
      </main>
      {showNavBar && (
        <BottomNavBar 
            onReportClick={() => setCurrentView('report')}
            onHomeClick={() => setCurrentView('feed')}
            onProfileClick={() => setCurrentView('profile')}
            activeView={currentView as 'feed' | 'profile'}
        />
      )}
    </div>
  );
}

export default App;
