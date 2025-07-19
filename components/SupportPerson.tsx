import FontAwesome from '@expo/vector-icons/FontAwesome'
import React from 'react'
import { Pressable, Text, View } from 'react-native'

export default function SupportPerson({ item }: any) {
  return (
    <View className="flex-row items-center justify-between">
      <View className="flex-row items-center gap-4">
        <View className="w-16 h-16 bg-slate-200 rounded-full items-center justify-center">
          <Text className="text-xl font-semibold text-slate-400">{item.email.slice(0, 2).toUpperCase()}</Text>
        </View>
        <View>
          <Text className="text-lg font-semibold text-slate-500">{item.name}</Text>
          <Text className="text-sm text-slate-400 font-montserrat">{item.email}</Text>
        </View>
      </View>
      <Pressable className="w-10 h-10 items-center justify-center">
        <FontAwesome name="times" size={24} color="#94a3b8" />
      </Pressable>
    </View>
  )
}