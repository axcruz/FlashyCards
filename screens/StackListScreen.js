// StackListScreen.js
import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity, FlatList, RefreshControl } from 'react-native';
import getAllStacks from '../utils/getAllStacks';
import { auth } from '../firebase/config';
import { getThemeStyles } from '../theme';

import AddStackModal from '../components/AddStackModal';

const StackListScreen = ({ route, navigation }) => {
  const { theme } = route.params;
  // Get theme styling
  const themeStyles = getThemeStyles(theme);
  const [refreshing, setRefreshing] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState([]);
  const [stacks, setStacks] = useState([]);

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
                marginVertical: 2,
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
                      marginLeft: 20,
                    }]}
                    onPress={() => navigation.navigate('Stack Details', { stackId: item.id, theme })}
                  >
                    <Text style={[themeStyles.titleText, { marginBottom: 8, }]} numberOfLines={1} ellipsizeMode='tail'>{item.stackName}</Text>
                      <Text style={[themeStyles.subText, {marginLeft: 5}]}>{item.cardCount > 0 ? (`${item.cardCount} Cards`) : ('No Cards')}</Text>
                  </TouchableOpacity>
                )}
                keyExtractor={(item) => item.id.toString()}
              />
            )}
          </>
        ) : (
          <ActivityIndicator size="large" />
        )
        }
      </React.Fragment>
    );
  };

  return (
    <View style={[themeStyles.container]}>
                <TouchableOpacity
            style={[themeStyles.primaryButton]}
            onPress={() => navigation.navigate('Add Stack')}
          >
            <Text style={[themeStyles.buttonText]}>New Stack</Text>
          </TouchableOpacity>
          <AddStackModal theme={theme}/>
      <FlatList
        data={Object.entries(groupedStacks)
          .map(([category, stacks]) => ({
            title: category,
            data: stacks,
          }))}
        refreshControl={
          <RefreshControl refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
        renderItem={renderItem}
        keyExtractor={(item) => item.title}
        ListHeaderComponent={<View style={{ marginBottom: 10 }}/>}
        ListFooterComponent={<View style={{ marginBottom: 5 }} />}
        ListHeaderComponentStyle={{ marginTop: 5 }}
      />
      <Text style={[themeStyles.subText, { alignSelf: 'center', marginVertical: 20 }]}>Pull down to refresh</Text>
    </View>
  );
};

export default StackListScreen;
