import React from 'react';
import { UserCircle, User, Users, Crown, Star } from 'lucide-react';

interface AvatarProps {
  level: number;
  avatarIndex: number;
  onAvatarChange: (index: number) => void;
}

const Avatar: React.FC<AvatarProps> = ({ level, avatarIndex, onAvatarChange }) => {
  // Array of available avatars based on unlocked levels
  const availableAvatars = [
    { icon: UserCircle, minLevel: 0, color: 'text-blue-500' },
    { icon: User, minLevel: 2, color: 'text-green-500' },
    { icon: Users, minLevel: 4, color: 'text-purple-500' },
    { icon: Crown, minLevel: 6, color: 'text-yellow-500' },
    { icon: Star, minLevel: 8, color: 'text-red-500' }
  ];

  // Filter avatars by level
  const unlockedAvatars = availableAvatars.filter(avatar => level >= avatar.minLevel);

  return (
    <div className="mb-4">
      <h3 className="font-semibold mb-2">Choose Your Avatar</h3>
      <div className="flex gap-2 flex-wrap">
        {unlockedAvatars.map((avatar, index) => {
          const AvatarIcon = avatar.icon;
          return (
            <button
              key={index}
              className={`p-2 rounded-full transition-all ${
                avatarIndex === index 
                  ? 'bg-gray-200 scale-110' 
                  : 'hover:bg-gray-100'
              }`}
              onClick={() => onAvatarChange(index)}
            >
              <AvatarIcon className={`h-8 w-8 ${avatar.color}`} />
            </button>
          );
        })}
      </div>
      {level < 8 && (
        <p className="text-xs mt-2 text-gray-500">
          Unlock more avatars by reaching level {
            availableAvatars.find(a => a.minLevel > level)?.minLevel
          }!
        </p>
      )}
    </div>
  );
};

export default Avatar;