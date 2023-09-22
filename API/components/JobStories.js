import React, { useEffect, useState } from 'react';
import { View,  FlatList } from 'react-native';
import { Divider,Text } from 'react-native-paper';
import axios from 'axios';

const JobStories = () => {
  const [jobStories, setJobStories] = useState([]);

  useEffect(() => {
    // Fetch job stories from the Hacker News API
    axios
      .get('https://hacker-news.firebaseio.com/v0/jobstories.json')
      .then((response) => {
        // Extract the first 10 job story IDs
        const jobStoryIds = response.data.slice(0, 20);

        // Fetch details for each job story
        const promises = jobStoryIds.map((storyId) =>
          axios.get(`https://hacker-news.firebaseio.com/v0/item/${storyId}.json`)
        );

        // Resolve all promises and set the job stories state
        Promise.all(promises).then((results) => {
          const jobStoriesData = results.map((result) => result.data);
          setJobStories(jobStoriesData);
        });
      });
  }, []);

  return (
    <View>
      <FlatList
        data={jobStories}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View>
            <Text variant="bodyLarge">{item.title}</Text>
            <Divider ></Divider>
          </View>
        )}
      />
    </View>
  );
};

export default JobStories;
