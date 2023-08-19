// StackScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import getAllStacks from '../firebase/util/getAllStacks';

const StackScreen = ({ route, navigation }) => {
  const [expandedCategories, setExpandedCategories] = useState([]);
  const [stacks, setStacks] = useState([]);

  useEffect(() => {
       // Fetch stacks every time the screen is rendered
    const fetchStacks = async () => {
      try {
        const allStacks = await getAllStacks();
        setStacks(allStacks);
      } catch (error) {
        // Handle error
      }
    };

    fetchStacks();
  });

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
        {stacks ?  (
          <>
        <TouchableOpacity
          style={styles.sectionHeader}
          onPress={() => toggleCategory(item.title)}
        >
          <Text style={styles.sectionHeaderText}>{item.title}</Text>
          <Text style={styles.arrow}>{isExpanded ? '▼' : '▶'}</Text>
        </TouchableOpacity>
        {isExpanded && (
          <FlatList
            data={item.data}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.stackItem}
                onPress={() => navigation.navigate('Stack Details', { stackId: item.id })}
              >
                <Text style={styles.stackName}>{item.stackName}</Text>
                { item.cardCount > 0 ? (
                <Text style={styles.cardCount}>{`${item.cardCount} Cards`}</Text>
         ) : (
          <Text style={styles.cardCount}>{'No Cards'}</Text>
         ) }
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.id.toString()}
          />
        )}
        </>
        ) : (
          <ActivityIndicator size="large" color="#007AFF" />
        )
         }
      </React.Fragment>
    );
  };

  return (
    <View style={styles.container}>
                  <TouchableOpacity
        style={styles.addStackButton}
        onPress={() => navigation.navigate('Add Stack')}
      >
        <Text style={styles.addStackButtonText}>Create a New Stack</Text>
      </TouchableOpacity>
      <FlatList
        data={Object.entries(groupedStacks).map(([category, stacks]) => ({
          title: category,
          data: stacks,
        }))}
        renderItem={renderItem}
        keyExtractor={(item) => item.title}
        ListHeaderComponent={<View style={{ marginBottom: 12 }} />}
        ListFooterComponent={<View style={{ marginBottom: 12 }} />}
        ListHeaderComponentStyle={{ marginTop: 12 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  sectionHeaderText: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  arrow: {
    fontSize: 18,
  },
  stackItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    padding: 10,
    margin: 6,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2,
  },
  stackName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  cardCount: {
    fontSize: 16,
    color: '#888888',
  },
  addStackButton: {
    margin: 20,
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#788eec',
  },
  addStackButtonText: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
  },
});

export default StackScreen;
