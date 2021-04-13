import React from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import Post from '../components/post';
import {FeedNavigationProp} from '../utils/navigation-types';

const DATA = [
  {
    id: 0,
    source_url: 'https://www.medscape.com/viewarticle/948633',
    long_summary:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In condimentum nisi sed pharetra hendrerit. Curabitur lobortis leo dolor, nec posuere sapien bibendum a. Etiam aliquam luctus tempus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Quisque vitae ligula in velit cursus posuere in id neque. Duis consequat tempus magna id ultricies. Aliquam erat volutpat. Integer vitae elit non enim mattis dignissim. Vestibulum mollis sapien erat.',
    headline: 'Millennials Turning to Telehealth, Online Research',
    summary:
      "The internet is often the first place many of us go to find information, whether it's about hotels, music, or furniture.And health guidance is no exception — especially among millennials.",
    image_url:
      'https://img.medscapestatic.com/thumbnail_library/gty_210402_telemedicine_telehealth_800x450.jpg?interpolation=lanczos-none&resize=234:160',
  },
  {
    id: 1,
    source_url: 'https://www.medscape.com/viewarticle/948632',
    long_summary:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In condimentum nisi sed pharetra hendrerit. Curabitur lobortis leo dolor, nec posuere sapien bibendum a. Etiam aliquam luctus tempus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Quisque vitae ligula in velit cursus posuere in id neque. Duis consequat tempus magna id ultricies. Aliquam erat volutpat. Integer vitae elit non enim mattis dignissim. Vestibulum mollis sapien erat.',
    headline:
      'Battle Brews Over Neutral Zone Where Border- Crossing Parties Rendezvous, Risking Infection',
    summary:
      'BLAINE, Wash. — In the shadows of covid travel restrictions, a 42-acre park on the far western edge of the U.S.-Canadian dividing line has become a popular opening in an otherwise closed border, a place where Americans and Canadians can gather without needing permission to go through an official border crossing.',
    image_url:
      'https://img.medscapestatic.com/thumbnail_library/khn_210402_zuidmeer_families_800x450.jpg?interpolation=lanczos-none&resize=360:*',
  },
  {
    id: 2,
    source_url: 'https://www.medscape.com/viewarticle/948630',
    long_summary:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In condimentum nisi sed pharetra hendrerit. Curabitur lobortis leo dolor, nec posuere sapien bibendum a. Etiam aliquam luctus tempus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Quisque vitae ligula in velit cursus posuere in id neque. Duis consequat tempus magna id ultricies. Aliquam erat volutpat. Integer vitae elit non enim mattis dignissim. Vestibulum mollis sapien erat.',
    headline: 'CDC: Get Vaccinated and You Can Travel',
    summary:
      'April 2, 2021 -- People who are fully vaccinated can now safely travel with low risk for COVID-19 transmission, according to new CDC guidance issued Friday -- a move White House officials acknowledge could seem contradictory given recent pleas for caution amid rising cases.',
    image_url:
      'https://img.medscapestatic.com/thumbnail_library/gty_210402_covid_mask_airplane_passenger_travel_800x450.jpg?interpolation=lanczos-none&resize=360:*',
  },
];

interface Props {
  navigation: FeedNavigationProp;
}

const Feed = (props: Props) => {
  if (props) {
    console.log('props');
  }
  const renderPost = ({item}: any) => {
    return (
      <Post
        caption={item.summary}
        title={item.headline}
        image_url={item.image_url}
        source_url={item.source_url}
        long_summary={item.long_summary}
      />
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.posts}
        data={DATA}
        keyExtractor={item => item.id.toString()}
        renderItem={renderPost}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  posts: {
    flex: 1,
    backgroundColor: 'white',
  },
});
export default Feed;
