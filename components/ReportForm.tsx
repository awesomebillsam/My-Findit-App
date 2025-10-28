
import React, { useState, useRef } from 'react';
import { Item, ItemStatus, Region } from '../types';
import { analyzeItemImage } from '../services/geminiService';
import ChevronLeftIcon from './icons/ChevronLeftIcon';
import CameraIcon from './icons/CameraIcon';
import MapPinIcon from './icons/MapPinIcon';

const regions: Region[] = ['Local', 'America', 'Asia', 'Africa', 'Europe'];

interface ReportFormProps {
  onAddItem: (item: Omit<Item, 'id' | 'reportedAt' | 'author'>) => void;
  onBack: () => void;
}

const ReportForm: React.FC<ReportFormProps> = ({ onAddItem, onBack }) => {
  const [status, setStatus] = useState<ItemStatus>(ItemStatus.Lost);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [location, setLocation] = useState<{ latitude: number, longitude: number, text: string } | null>(null);
  const [region, setRegion] = useState<Region>('Local');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleAnalyzeImage = async () => {
    if (!imageFile) return;
    setIsAnalyzing(true);
    try {
      const analyzedName = await analyzeItemImage(imageFile);
      setName(analyzedName);
    } catch (error) {
      console.error(error);
      // You could set an error state here to show to the user
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleGetLocation = () => {
    setIsGettingLocation(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        // In a real app, you'd use a reverse geocoding service here.
        setLocation({ latitude, longitude, text: `Near you (${latitude.toFixed(2)}, ${longitude.toFixed(2)})` });
        setIsGettingLocation(false);
      },
      (error) => {
        console.error("Error getting location", error);
        alert("Could not get location. Please enable location services.");
        setIsGettingLocation(false);
      }
    );
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !imagePreview || !location) {
        alert("Please fill name, upload an image, and set a location.");
        return;
    }
    onAddItem({
        name,
        description,
        status,
        imageUrl: imagePreview,
        location,
        region,
    });
  };

  return (
    <div className="p-4 bg-white min-h-full">
      <header className="flex items-center mb-6 relative">
        <button onClick={onBack} className="p-2 -ml-2">
            <ChevronLeftIcon className="h-6 w-6 text-slate-600" />
        </button>
        <h2 className="text-xl font-bold text-slate-800 text-center flex-grow">Report an Item</h2>
        <div className="w-6"/>
      </header>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
            <div className="grid grid-cols-2 gap-2 rounded-full bg-slate-100 p-1">
                <button type="button" onClick={() => setStatus(ItemStatus.Lost)} className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${status === ItemStatus.Lost ? 'bg-red-500 text-white shadow' : 'text-slate-600'}`}>I Lost Something</button>
                <button type="button" onClick={() => setStatus(ItemStatus.Found)} className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${status === ItemStatus.Found ? 'bg-green-500 text-white shadow' : 'text-slate-600'}`}>I Found Something</button>
            </div>
        </div>

        <div>
            <label htmlFor="image-upload" className="block text-sm font-medium text-slate-700 mb-1">Item Image</label>
            <input type="file" id="image-upload" accept="image/*" ref={fileInputRef} onChange={handleImageChange} className="hidden" />
            <div onClick={() => fileInputRef.current?.click()} className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-slate-300 border-dashed rounded-md cursor-pointer">
                {imagePreview ? (
                    <img src={imagePreview} alt="Item preview" className="max-h-48 rounded-md" />
                ) : (
                    <div className="space-y-1 text-center">
                        <CameraIcon className="mx-auto h-12 w-12 text-slate-400" />
                        <p className="text-sm text-slate-600">Click to upload a photo</p>
                    </div>
                )}
            </div>
             {imageFile && (
                <button type="button" onClick={handleAnalyzeImage} disabled={isAnalyzing} className="mt-2 w-full text-sm bg-sky-100 text-sky-700 font-semibold py-2 px-4 rounded-lg hover:bg-sky-200 disabled:bg-slate-200 disabled:text-slate-500 transition-colors">
                    {isAnalyzing ? 'Analyzing...' : '✨ Auto-fill with AI'}
                </button>
            )}
        </div>

        <div>
          <label htmlFor="name" className="block text-sm font-medium text-slate-700">Item Name</label>
          <input type="text" id="name" value={name} onChange={e => setName(e.target.value)} required className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"/>
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-slate-700">Description (Optional)</label>
          <textarea id="description" value={description} onChange={e => setDescription(e.target.value)} rows={3} className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"></textarea>
        </div>

        <div>
          <label htmlFor="region" className="block text-sm font-medium text-slate-700">Region</label>
          <select id="region" value={region} onChange={e => setRegion(e.target.value as Region)} className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500">
            {regions.map(r => <option key={r} value={r}>{r}</option>)}
          </select>
        </div>
        
        <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Location</label>
            {location ? (
                <div className="p-3 bg-slate-100 rounded-md text-sm text-slate-700">{location.text}</div>
            ) : (
                <button type="button" onClick={handleGetLocation} disabled={isGettingLocation} className="w-full flex items-center justify-center text-sm bg-slate-100 text-slate-700 font-semibold py-2 px-4 rounded-lg hover:bg-slate-200 disabled:bg-slate-200 disabled:text-slate-500 transition-colors">
                    <MapPinIcon className="h-5 w-5 mr-2" />
                    {isGettingLocation ? 'Getting location...' : 'Use Current Location'}
                </button>
            )}
        </div>

        <div className="pt-4">
            <button type="submit" className="w-full bg-sky-500 text-white font-bold py-3 px-4 rounded-full hover:bg-sky-600 transition-colors shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500">
                Submit Report
            </button>
        </div>
      </form>
    </div>
  );
};

export default ReportForm;
