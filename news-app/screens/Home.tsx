import { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Appbar, Chip } from 'react-native-paper'

const categories = [
  'Top',
  'Technology',
  'Sports',
  'Politics',
  'Health',
  'Business',
  'World'
]

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState(['Top'])
  const handleSelect = (val: string) => {
    setSelectedCategory((pre: string[]) => {
      const foundCategory = pre.find((c) => c === val)
      return foundCategory ? pre.filter((c) => c !== val) : [...pre, val]
    })
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
      </View>
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
  }
})
