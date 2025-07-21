import { useAuth } from '@/context/AuthContext';
import React from 'react';
import { Text, View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

export default function generate() {
  const { user } = useAuth();
  
  return (
    <View className="container">
      <View className="w-64 h-64 bg-primary-100 rounded-2xl text-primary-100 items-center justify-center">
        {user?.$id && (
          <QRCode
            value={user.$id}
            size={160}
            color="#6BB2FA"
            backgroundColor="#CEE5FD"
          />
        )}
      </View>
      <View className='my-10'/>
      <Text className='text-slate-500 font-montserrat text-center w-48 leading-6'>
        Use this QR code to invite family to support
      </Text>
    </View>
  )
}