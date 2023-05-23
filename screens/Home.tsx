// @ts-nocheck
import { useState } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import {
  Appbar,
  Chip,
  Button,
  useTheme,
  ProgressBar,
  MD3Colors
} from 'react-native-paper'
import { ComponentNavigationProps, NewsData } from '../utils/types'
import CardItem from '../components/CardItem'

const categories = ['Top', 'Technology', 'Sports', 'Politics', 'Health']

const Home = (props: ComponentNavigationProps) => {
  const [newsData, setNewsData] = useState<NewsData[]>([])
  const [nextPage, setNextPage] = useState('')
  const [loading, setLoading] = useState(false)
  const theme = useTheme()
  const [selectedCategory, setSelectedCategory] = useState([])
  const API_KEY = `pub_2249054e5ac0641fa41320b615ebfa4a0e633`
  const handleSelect = (val: string) => {
    setSelectedCategory((pre: string[]) => {
      const foundCategory = pre.find((c) => c === val)
      return foundCategory ? pre.filter((c) => c !== val) : [...pre, val]
    })
  }
  const handlePress = async () => {
    const URL = `https://newsdata.io/api/1/news?apikey=${API_KEY}&country=pk&language=en${
      selectedCategory.length > 0
        ? `&category=${selectedCategory.join(',')}`
        : ''
    }${nextPage?.length > 0 ? `&page=${nextPage}` : ''}`
    try {
      setLoading(true)
      await fetch(URL)
        .then((res) => res.json())
        .then((data) => {
          setNewsData((prev) => [...prev, ...data.results])
          setNextPage(data.nextPage)
        })
      setLoading(false)
    } catch (error) {}
  }
  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.Content title="Home"></Appbar.Content>
      </Appbar.Header>
      <View style={styles.filterContainer}>
        {categories.map((category) => (
          <Chip
            key={category}
            mode="outlined"
            style={styles.chipItem}
            textStyle={{ fontWeight: '400', color: 'white', padding: 1 }}
            selected={
              selectedCategory.find((c) => c === category) ? true : false
            }
            onPress={() => handleSelect(category)}
          >
            {category}
          </Chip>
        ))}
        <Button
          mode="elevated"
          icon="sync"
          style={styles.button}
          labelStyle={{
            fontSize: 14,
            margin: 'auto',
            color: theme.colors.primary
          }}
          onPress={handlePress}
        >
          Refresh
        </Button>
      </View>
      {/* <Progress.Bar progress={0} indeterminate={loading} width={300} /> */}
      <ProgressBar visible={loading} indeterminate color={MD3Colors.error50} />
      <FlatList
        keyExtractor={(item) => item.title}
        onEndReached={() => handlePress()}
        style={styles.flatList}
        data={newsData}
        renderItem={({ item }) => (
          <CardItem
            navigation={props.navigation}
            content={item.content}
            description={item.description}
            image_url={item.image_url}
            title={item.title}
            key={item.key}
          />
        )}
      />
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  filterContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 10
  },
  chipItem: {
    marginHorizontal: 5,
    marginVertical: 5
  },
  button: {
    padding: 0,
    maxHeight: 40
  },
  flatList: {
    flex: 1,
    height: 'auto'
  }
})
