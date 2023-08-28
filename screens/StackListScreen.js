// StackListScreen.js
import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity, FlatList, RefreshControl, ActivityIndicator, useColorScheme } from 'react-native';
import getAllStacks from '../utils/getAllStacks';
import { auth } from '../firebase/config';

import LoadingIndicator from '../components/LoadingIndicator';
import StackModal from '../components/StackModal';
import SettingsModal from '../components/SettingsModal';

import { getThemeStyles } from '../styles/theme';

const StackListScreen = ({ route, navigation }) => {

  const [refreshing, setRefreshing] = useState(false);
  const [stacks, setStacks] = useState([]);
  const [expandedCategories, setExpandedCategories] = useState([]);

  const themeStyles = getThemeStyles(useColorScheme());

  useEffect(() => {
    // Fetch stack data
    if (auth.currentUser) {
      const fetchStacks = async () => {
        try {
          const allStacks = await getAllStacks();
          setStacks(allStacks);
        } catch (error) {
          // Handle error
        }
      };
      fetchStacks();
    }
  }, [refreshing]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  // Function to group stacks by category for Accordion
  const groupedStacks = stacks.reduce((result, stack) => {
    const category = stack.category || 'Uncategorized';
    result[category] = [...(result[category] || []), stack];
    return result;
  }, {});

  const toggleCategory = (category) => {
    if (expandedCategories.includes(category)) {
      setExpandedCategories((prevCategories) =>
        prevCategories.filter((item) => item !== category)
      );
    } else {
      setExpandedCategories((prevCategories) => [...prevCategories, category]);
    }
  };

  const renderItem = ({ item }) => {
    const isExpanded = expandedCategories.includes(item.title);
    return (
      <React.Fragment>
        {stacks ? (
          <>
            <TouchableOpacity
              style={[themeStyles.card, {
                flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', justifyContent: 'space-between',
                marginTop: 10,
                marginBottom: 2,
              }]}
              onPress={() => toggleCategory(item.title)}
            >
              <Text style={[themeStyles.titleText, { width: '90%' }]}
                numberOfLines={1} ellipsizeMode='tail'
              >{item.title}</Text>
              <Text style={[themeStyles.text]}>{isExpanded ? '▼' : '▶'}</Text>
            </TouchableOpacity>
            {isExpanded && (
              <FlatList
                data={item.data}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={[themeStyles.card, {
                      marginVertical: 5,
                      marginLeft: 30,
                    }]}
                    onPress={() => navigation.navigate('Stack Details', { stackId: item.id})}
                  >
                    <Text style={[themeStyles.titleText, { marginBottom: 8, }]} numberOfLines={1} ellipsizeMode='tail'>{item.stackName}</Text>
                    <Text style={[themeStyles.subText, { marginLeft: 3 }]}>{item.cardCount > 0 ? (`${item.cardCount} Cards`) : ('No Cards')}</Text>
                  </TouchableOpacity>
                )}
                keyExtractor={(item) => item.id.toString()}
              />
            )}
          </>
        ) : (
          <ActivityIndicator size="large" style={{ justifyContent: "center" }} />
        )
        }
      </React.Fragment>
    );
  };

  return (
    <>
      {themeStyles ? (
        <View style={[themeStyles.container]}>
          <View style={{ flexDirection: 'row', paddingBottom: 10, marginBottom: 10, borderBottomWidth: 1, borderBottomColor: 'gray' }}>
            <StackModal mode={'add'} onRefresh={onRefresh} />
            <SettingsModal onRefresh={onRefresh} />
          </View>
          <FlatList
            data={Object.entries(groupedStacks)
              .map(([category, stacks]) => ({
                title: category,
                data: stacks,
              }))}
            refreshControl={
              <RefreshControl refreshing={refreshing}
                onRefresh={onRefresh}
                tintColor={'gray'}
                title="Refreshing"
                titleColor={'gray'}
              />
            }
            renderItem={renderItem}
            keyExtractor={(item) => item.title}
            ListHeaderComponent={<View style={{ marginBottom: 10 }} />}
            ListFooterComponent={<View style={{ marginTop: 10 }} />}
            ListHeaderComponentStyle={{ marginTop: 5 }}
          />
        </View>
      ) : (
        <LoadingIndicator />
      )}
    </>
  );
};

export default StackListScreen;
