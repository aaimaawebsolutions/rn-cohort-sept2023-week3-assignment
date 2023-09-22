import React, { useState, useEffect } from 'react';
import { View,  FlatList, TouchableOpacity, Linking,  } from 'react-native';
import { Divider,Text } from 'react-native-paper';
import axios from 'axios';

const NewsList = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    // Define a function to fetch news data
    const fetchNews = async () => {
      try {
        const response = await axios.get(
          'https://hacker-news.firebaseio.com/v0/topstories.json'
        );

        // Assuming the response contains an array of news item IDs
        const newsItemIds = response.data;

        // Fetch details for the first few news items (e.g., top 10)
        const topNewsItemIds = newsItemIds.slice(0, 20);
        const newsPromises = topNewsItemIds.map((itemId) =>
          axios.get(`https://hacker-news.firebaseio.com/v0/item/${itemId}.json`)
        );

        const newsData = await Promise.all(newsPromises);

        // Set the news data in state
        setNews(newsData.map((response) => response.data));
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };

    // Call the fetchNews function
    fetchNews();
  }, []);

  // Render the news items in your component
  return (
    <View >
      <FlatList
        data={news}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => Linking.openURL(item.url)}
          >
            <Text variant="bodyLarge">{item.title}</Text>
            <Divider />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default NewsList;
