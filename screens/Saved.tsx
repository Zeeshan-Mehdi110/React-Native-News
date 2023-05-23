//@ts-nocheck
import { StyleSheet, View, FlatList } from 'react-native'
import React from 'react'
import { Appbar } from 'react-native-paper'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useEffect, useState } from 'react'
import { useIsFocused } from '@react-navigation/native'
import { ComponentNavigationProps, NewsData } from '../utils/types'
import CardItem from '../components/CardItem'

const getData = async () => {
  try {
    const value = await AsyncStorage.getItem('@newsData')
    if (value !== null) {
      // value previously stored
      return JSON.parse(value)
    }
  } catch (e) {
    // error reading value
    alert('Something went wrong')
    return
  }
}

const storeData = async (value: string) => {
  const data: NewsData[] = (await getData()) || []
  const filteredNews = data.filter((news) => news.title !== value)
  try {
    const jsonValue = JSON.stringify(filteredNews)
    await AsyncStorage.setItem('@newsData', jsonValue)
  } catch (e) {
    // saving error
    return alert('Something went wrong while saving data')
  }
}

const deleteHandler = async (value: string) => {
  await storeData(value)
}

const Saved = (props: ComponentNavigationProps) => {
  const focused = useIsFocused()
  const [savedNews, setSavedNews] = useState([])
  useEffect(() => {
    getData()
      .then((data) => setSavedNews(data))
      .catch((err) => alert('Something went wrong'))
  }, [focused])
  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.Content title="Saved"></Appbar.Content>
      </Appbar.Header>
      <FlatList
        keyExtractor={(item) => item.title}
        style={styles.flatList}
        data={savedNews}
        renderItem={({ item }) => (
          <CardItem
            handleDelete={deleteHandler}
            navigation={props.navigation}
            content={item.content}
            description={item.description || ''}
            image_url={item.image_url}
            title={item.title}
            key={item.key}
          />
        )}
      />
    </View>
  )
}

export default Saved

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  flatList: {
    flex: 1,
    height: 'auto'
  }
})
