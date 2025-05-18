import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Calendar } from 'react-native-calendars';

const { width } = Dimensions.get('window');

interface MyCalendarProps {
  onDateSelect: (date: string) => void;
}

const MyCalendar: React.FC<MyCalendarProps> = ({ onDateSelect }) => {
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [currentMonth, setCurrentMonth] = useState(today.toISOString().split('T')[0]);

  const onDayPress = (day: any) => {
    if (new Date(day.dateString) > today) return;
    setSelectedDate(day.dateString);
    onDateSelect(day.dateString);
  };

  const weekDays = [ 'SUN','MON','TUE', 'WED', 'THU', 'FRI', 'SAT'];

  return (
    <View style={styles.container}>

      {/* Keep month/year text only, no arrows */}
      <View style={styles.navigationContainer}>
        <Text style={styles.monthText}>
          {new Date(currentMonth).toLocaleString('default', { month: 'long', year: 'numeric' }).toUpperCase()}
        </Text>
      </View>

      {/* Weekday header */}
      <View style={styles.weekDayContainer}>
        {weekDays.map((day) => (
          <View key={day} style={styles.dayBox}>
            <Text style={styles.dayText}>{day}</Text>
          </View>
        ))}
      </View>

      {/* Calendar */}
      <View style={styles.calendarFrame}>
        <Calendar
          current={currentMonth}
          maxDate={today.toISOString().split('T')[0]}
          onDayPress={onDayPress}
          markedDates={{
            [selectedDate]: { selected: true, selectedColor: '#6B2A88', selectedTextColor: 'white' },
          }}
          hideExtraDays={true}
          theme={{
            backgroundColor: '#EABAFF',
            calendarBackground: '#EABAFF',
            dayTextColor: 'black',
            textSectionTitleColor: 'transparent', // hide default weekdays
            textDayFontSize: 18,
            monthTextColor: '#6B2A88',
            arrowColor: '#6B2A88',
          }}
          renderHeader={() => <></>} // hide default header (with arrows)
          onMonthChange={(month) => setCurrentMonth(month.dateString)} // update currentMonth on swipe
          style={{ width: width - 30 }}
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
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  monthText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#6B2A88',
  },
  weekDayContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: width - 30,
    marginBottom: 5,
    paddingHorizontal: 2,
  },
  dayBox: {
    flex: 1,
    backgroundColor: '#6B2A88',
    borderRadius: 20,
    marginHorizontal: 2,
    alignItems: 'center',
    paddingVertical: 4,
  },
  dayText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
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
