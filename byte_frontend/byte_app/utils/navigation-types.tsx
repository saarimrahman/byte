import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Feed: undefined;
  InitialInfo: undefined;
  SinglePost: {
    title: string;
    image_url: string;
    caption: string;
    source_url: string;
    source: string;
  };
};

export type LoginNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Login'
>;

export type RegisterNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Register'
>;

export type FeedNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Feed'
>;

export type InitialInfoNavigationProp = StackNavigationProp<
  RootStackParamList,
  'InitialInfo'
>;

export type SinglePostNavigationProp = StackNavigationProp<
  RootStackParamList,
  'SinglePost'
>;

export type SinglePostRouteProp = RouteProp<RootStackParamList, 'SinglePost'>;
