import React from 'react'
import { Text, View } from 'react-native'

export default function generate() {
  return (
    <View className="container">
      <View className="w-80 h-80 bg-slate-500 rounded-lg" />
      <View className='my-10'/>
      <Text className='text-slate-500 font-montserrat text-center w-48 leading-6'>Use this QR code to invite family to support</Text>
    </View>
  )
}