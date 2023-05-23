// @ts-nocheck
import { StyleSheet } from 'react-native';
import { useEffect } from 'react';
import { ComponentNavigationProps, NewsData } from '../utils/types';
import DetailsCard from '../components/DetailsCard';
import { Button, useTheme } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

const getData = async () => {
  try {
    const value = await AsyncStorage.getItem('@newsData');
    if (value !== null) {
      return JSON.parse(value);
    }
    return [];
  } catch (e) {
    console.log(e);
    return [];
  }
};

const storeData = async (value: NewsData) => {
  try {
    const data: NewsData[] = await getData();
    if (!data.find((d) => d.title === value.title)) {
      data.push(value);
    }
    const jsonValue = JSON.stringify(data);
    await AsyncStorage.setItem('@newsData', jsonValue);
  } catch (e) {
    console.log(e);
    alert('Something went wrong while saving data');
  }
};

const NewsOverView = (props: ComponentNavigationProps) => {
  const theme = useTheme();
  const { title, description, content, image_url } = props?.route
    ?.params as NewsData;

  useEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <Button
          onPress={() => storeData({ title, content, image_url })}
          color={theme.colors.primary}
          mode="contained"
        >
          Save
        </Button>
      )
    });
  }, []);

  return (
    <DetailsCard
      content={content}
      title={title}
      description={description}
      image_url={image_url}
    />
  );
};

export default NewsOverView;

const styles = StyleSheet.create({});
