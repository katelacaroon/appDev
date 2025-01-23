
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, Dimensions } from 'react-native';

const Stack = createStackNavigator();

function MemberListScreen({ navigation }) {
  const members = [
    {
      id: '1',
      name: 'S.Coups',
      subunit: 'Hip-Hop Team',
      role: 'Leader, Hip-Hop Team Leader, Rapper, Sub-Vocalist',
      realName: 'Choi Seungcheol',
      birthday: 'August 8, 1995',
      zodiac: 'Leo',
      mbti: 'INFP/ISTP',
      nationality: 'South Korean',
      image: require('./assets/scoups2.jpg'), 
    },
    {
      id: '2',
      name: 'Jeonghan',
      subunit: 'Vocal Team',
      role: 'Lead Vocalist, Visual',
      realName: 'Yoon Jeonghan',
      birthday: 'October 4, 1995',
      zodiac: 'Libra',
      mbti: 'ISFJ',
      nationality: 'South Korean',
      image: require('./assets/jeonghan2.jpg'),
    },
    {
      id: '3',
      name: 'Joshua',
      subunit: 'Vocal Team',
      role: 'Lead Vocalist, Visual',
      realName: 'Hong Jisoo',
      birthday: 'December 30, 1995',
      zodiac: 'Capricorn',
      mbti: 'ENFJ/ESTJ',
      nationality: 'Korean-American',
      image: require('./assets/joshua2.jpg'),
    },
    {
      id: '4',
      name: 'Jun',
      subunit: 'Performance Team',
      role: 'Lead Dancer, Sub-Vocalist',
      realName: 'Wen Junhui',
      birthday: 'June 10, 1996',
      zodiac: 'Gemini',
      mbti: 'INTP',
      nationality: 'Chinese',
      image: require('./assets/jun2.jpg'),
    },
    {
      id: '5',
      name: 'Hoshi',
      subunit: 'Performance Team, BSS',
      role: 'Performance Team Leader, Main Dancer, Lead Vocalist, Sub-Rapper',
      realName: 'Kwon Soonyoung',
      birthday: 'June 15, 1996',
      zodiac: 'Gemini',
      mbti: 'INFP/INTJ',
      nationality: 'South Korean',
      image: require('./assets/hoshi2.jpg'),
    },
    {
      id: '6',
      name: 'Wonwoo',
      subunit: 'Hip-Hop Team',
      role: 'Rapper, Sub-Vocalist',
      realName: 'Jeon Wonwoo',
      birthday: 'July 17, 1996',
      zodiac: 'Cancer',
      mbti: 'INFJ/INFP',
      nationality: 'South Korean',
      image: require('./assets/wonwoo2.jpg'),
    },
    {
      id: '7',
      name: 'Woozi',
      subunit: 'Vocal Team',
      role: ' Vocal Team Leader, Lead Vocalist, Producer',
      realName: 'Lee Jihoon',
      birthday: 'November 22, 1996',
      zodiac: 'Sagittarius',
      mbti: 'INFJ/INTJ',
      nationality: 'South Korean',
      image: require('./assets/woozi2.jpg'),
    },
    {
      id: '8',
      name: 'DK',
      subunit: 'Vocal Team, BSS',
      role: 'BSS Leader, Main Vocalist',
      realName: 'Lee Seokmin',
      birthday: 'February 18, 1997',
      zodiac: 'Aquarius',
      mbti: 'INFP',
      nationality: 'South Korean',
      image: require('./assets/dk2.jpg'),
    },
    {
      id: '9',
      name: 'Mingyu',
      subunit: 'Hip-Hop Team',
      role: 'Rapper, Sub-Vocalist, Visual, Face of the Group',
      realName: 'Kim Mingyu',
      birthday: 'April 6, 1997',
      zodiac: 'Aries',
      mbti: 'ENFJ/ENTJ',
      nationality: 'South Korean',
      image: require('./assets/mingyu2.jpg'),
    },
    {
      id: '10',
      name: 'The8',
      subunit: 'Performance Team',
      role: 'Lead Dancer, Sub-Vocalist, Sub-Rapper',
      realName: 'Xu Minghao',
      birthday: 'November 7, 1997',
      zodiac: 'Scorpio',
      mbti: 'INFJ/INTJ',
      nationality: 'Chinese',
      image: require('./assets/minghao2.jpg'),
    },
    {
      id: '11',
      name: 'Seungkwan',
      subunit: 'Vocal Team, BSS',
      role: 'Main Vocalist, Face of the Group',
      realName: 'Boo Seungkwan',
      birthday: 'January 16, 1998',
      zodiac: 'Capricorn',
      mbti: 'ENFP',
      nationality: 'South Korean',
      image: require('./assets/seungkwan2.jpg'),
    },
    {
      id: '12',
      name: 'Vernon',
      subunit: 'Hip-Hop Team',
      role: 'Rapper, Sub-Vocalist, Visual, Face of the Group',
      realName: 'Hansol Vernon Chwe',
      birthday: 'February 18, 1998',
      zodiac: 'Aquarius',
      mbti: 'ENFP',
      nationality: 'Korean-American',
      image: require('./assets/vernon2.jpg'),
    },
    {
      id: '13',
      name: 'Dino',
      subunit: 'Performance Team',
      role: 'Main Dancer, Sub-Vocalist, Sub-Rapper, Maknae',
      realName: 'Lee Chan',
      birthday: 'February 11, 1999',
      zodiac: 'Aquarius',
      mbti: 'INFJ',
      nationality: 'South Korean',
      image: require('./assets/dino2.jpg'),
    },
  ];

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.item} 
      onPress={() => navigation.navigate('MemberDetail', { member: item })}
    >
      <Image source={item.image} style={styles.image} />
      <Text style={styles.name}>{item.name}</Text>
    </TouchableOpacity>
  );
  
  return (
    <View style={styles.listcontainer}>
       <Image source={require('./assets/ot13svt.jpg')} style={styles.svtimage} />
      <Text style={styles.header}>Seventeen Members</Text>
      <FlatList
        data={members}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );  
}

function MemberDetailScreen({ route, navigation }) {
  const { member } = route.params;

  return (
    <View style={styles.detailContainer}>
      <View style={styles.card}>
        <Image source={member.image} style={styles.profileImage} />
        <Text style={styles.memberName}>{member.name}</Text>
  
  
        <View style={styles.detailRow}>
          <Text style={styles.label}>Birth Name: </Text>
          <Text style={styles.value}>{member.realName}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Sub-unit: </Text>
          <Text style={styles.value}>{member.subunit}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Position: </Text>
          <Text style={styles.value}>{member.role}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Birthday: </Text>
          <Text style={styles.value}>{member.birthday}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Zodiac: </Text>
          <Text style={styles.value}>{member.zodiac}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>MBTI: </Text>
          <Text style={styles.value}>{member.mbti}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Nationality: </Text>
          <Text style={styles.value}>{member.nationality}</Text>
        </View>
      </View>
    </View>
  );
}


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="MemberList">
        <Stack.Screen
          name="MemberList"
          component={MemberListScreen}
          options={{ title: 'SEVENTEEN' }}
        />
        <Stack.Screen
          name="MemberDetail"
          component={MemberDetailScreen}
          options={{ title: 'SEVENTEEN' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  listcontainer: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F7CAC9', 
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16, 
  },
  item: {
    flexDirection: 'row', 
    alignItems: 'center', 
    padding: 13,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: '#09122C', 
    borderRadius: 8,
    backgroundColor: '#B3CEE5', 
  },
  image: {
    width: 60, 
    height: 60,
    borderRadius: 50, 
    marginRight: 16, 
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  svtimage: {
    width: '100%', 
    height: screenWidth * (1 / 3),
    resizeMode: 'cover', 
    borderRadius: 15,
    marginBottom: 15,
  },
  detailContainer: {
    flex: 1,
    backgroundColor: '#B3CEE5', 
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  card: {
    backgroundColor: '#F7CAC9', 
    borderRadius: 16,
    padding: 20,
    width: '90%',
    elevation: 5,
    shadowColor: '#09122C',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    alignItems: 'center', 
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 16,
  },
  memberName: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    marginBottom: 8,
    alignItems: 'flex-start',
    width: '100%', 
  },
  label: {
    fontWeight: 'bold',
    fontSize: 16,
    width: 120, 
    marginRight: 8, 
  },
  value: {
    fontSize: 16,
    flexShrink: 1, 
  },
});
