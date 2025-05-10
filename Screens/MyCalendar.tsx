import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { CalendarList } from 'react-native-calendars';
import { AntDesign } from '@expo/vector-icons'; // Import arrow icons

const { width } = Dimensions.get('window');

interface MyCalendarProps {
  onDateSelect: (date: string) => void; // Pass the selected date to parent
}

const MyCalendar: React.FC<MyCalendarProps> = ({ onDateSelect }) => {
  const [selectedDate, setSelectedDate] = useState('');
  const [currentMonth, setCurrentMonth] = useState(new Date().toISOString().split('T')[0]); // Track current month
  const [key, setKey] = useState(0); // Force re-render

  // Handle day press and notify parent component
  const onDayPress = (day: any) => {
    console.log('Selected Day:', day);
    setSelectedDate(day.dateString);
    onDateSelect(day.dateString); // Pass the selected date to the parent
  };

  // Navigate to the previous month
  const goToPreviousMonth = () => {
    const newDate = new Date(currentMonth);
    newDate.setMonth(newDate.getMonth() - 1);
    setCurrentMonth(newDate.toISOString().split('T')[0]);
    setKey((prevKey) => prevKey + 1); // Force re-render
  };

  // Navigate to the next month
  const goToNextMonth = () => {
    const newDate = new Date(currentMonth);
    newDate.setMonth(newDate.getMonth() + 1);
    setCurrentMonth(newDate.toISOString().split('T')[0]);
    setKey((prevKey) => prevKey + 1); // Force re-render
  };

  return (
    <View style={styles.container}>
      <View style={styles.navigationContainer}>
        <TouchableOpacity onPress={goToPreviousMonth} style={styles.arrowButton}>
          <AntDesign name="left" size={24} color="#6B2A88" />
        </TouchableOpacity>
        <Text style={styles.monthText}>
          {new Date(currentMonth).toLocaleString('default', { month: 'long', year: 'numeric' })}
        </Text>
        <TouchableOpacity onPress={goToNextMonth} style={styles.arrowButton}>
          <AntDesign name="right" size={24} color="#6B2A88" />
        </TouchableOpacity>
      </View>

      <View style={styles.calendarFrame}>
        <CalendarList
          key={key} // This forces a re-render when month changes
          current={currentMonth} // Updates calendar to the selected month
          onDayPress={onDayPress}
          markedDates={{
            [selectedDate]: { selected: true, selectedColor: '#6B2A88', selectedTextColor: 'white' },
          }}
          horizontal={false} // Enable horizontal scrolling
          pagingEnabled={true} // Snap to month
          calendarWidth={width - 30} // Fit inside the frame
          hideExtraDays={false} // Hide extra days
          disableMonthChange={true} // Prevent swipe change
          theme={{
            backgroundColor: '#EABAFF',
            calendarBackground: '#EABAFF',
            dayTextColor: 'black',
            textDayFontSize: 18,
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navigationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  arrowButton: {
    padding: 10,
  },
  monthText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#6B2A88',
    marginHorizontal: 10,
  },
  calendarFrame: {
    borderWidth: 3,
    borderColor: '#6B2A88',
    borderRadius: 15,
    padding: 10,
    backgroundColor: '#EABAFF',
  },
});

export default MyCalendar;
