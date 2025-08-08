import React, {useRef, useCallback, useState} from 'react';
import {Animated, Easing, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {ExpandableCalendar, AgendaList, CalendarProvider, WeekCalendar} from 'react-native-calendars';
import testIDs from '../testIDs';
import {agendaItems, getMarkedDates} from '../mocks/agendaItems';
import AgendaItem from '../mocks/AgendaItem';
import {getTheme, themeColor, lightThemeColor} from '../mocks/theme';
import type XDate from 'xdate';
const XDateClass = require('xdate');
import MonthYearPicker from '../../../src/calendar/header/MonthYearPicker';

const leftArrowIcon = require('../img/previous.png');
const rightArrowIcon = require('../img/next.png');
const ITEMS: any[] = agendaItems;

interface Props {
  weekView?: boolean;
}
const CHEVRON = require('../img/next.png');
const ExpandableCalendarScreen = (props: Props) => {
  const {weekView} = props;
  const marked = useRef(getMarkedDates());
  const theme = useRef(getTheme());
  const todayBtnTheme = useRef({
    todayButtonTextColor: themeColor
  });

  // const onDateChanged = useCallback((date, updateSource) => {
  //   console.log('ExpandableCalendarScreen onDateChanged: ', date, updateSource);
  // }, []);

  // const onMonthChange = useCallback(({dateString}) => {
  //   console.log('ExpandableCalendarScreen onMonthChange: ', dateString);
  // }, []);

  const renderItem = useCallback(({item}: any) => {
    return <AgendaItem item={item}/>;
  }, []);

  const calendarRef = useRef<{toggleCalendarPosition: () => boolean}>(null);
  const rotation = useRef(new Animated.Value(0));

  const toggleCalendarExpansion = useCallback(() => {
    const isOpen = calendarRef.current?.toggleCalendarPosition();
    Animated.timing(rotation.current, {
      toValue: isOpen ? 1 : 0,
      duration: 200,
      useNativeDriver: true,
      easing: Easing.out(Easing.ease)
    }).start();
  }, []);

  const [pickerVisible, setPickerVisible] = useState(false);
  const [providerDate, setProviderDate] = useState(ITEMS[1]?.title);

  const renderHeader = useCallback(
    (date?: XDate) => {
      const rotationInDegrees = rotation.current.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '-180deg']
      });
      return (
        <View style={styles.header}>
          <TouchableOpacity onPress={toggleCalendarExpansion} style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={styles.headerTitle}>{date?.toString('MMMM yyyy')}</Text>
            <Animated.Image source={CHEVRON} style={{transform: [{rotate: '90deg'}, {rotate: rotationInDegrees}]}}/>
          </TouchableOpacity>
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityLabel="Open month and year picker"
            testID={`${testIDs.expandableCalendar.CONTAINER}.openPickerButton`}
            onPress={() => setPickerVisible(true)}
            style={{paddingHorizontal: 6, paddingVertical: 4, marginLeft: 6}}
          >
            <Text style={{fontSize: 16, marginLeft: 10}}>📅</Text>
          </TouchableOpacity>
        </View>
      );
    },
    [toggleCalendarExpansion, pickerVisible, providerDate]
  );

  const onCalendarToggled = useCallback(
    (isOpen: boolean) => {
      rotation.current.setValue(isOpen ? 1 : 0);
    },
    [rotation]
  );

  return (
    <CalendarProvider
      date={providerDate}
      // onDateChanged={onDateChanged}
      // onMonthChange={onMonthChange}
      showTodayButton
      // disabledOpacity={0.6}
      theme={todayBtnTheme.current}
      // todayBottomMargin={16}
      // disableAutoDaySelection={[ExpandableCalendar.navigationTypes.MONTH_SCROLL, ExpandableCalendar.navigationTypes.MONTH_ARROWS]}
    >
      {weekView ? (
        <WeekCalendar testID={testIDs.weekCalendar.CONTAINER} firstDay={1} markedDates={marked.current}/>
      ) : (
        <ExpandableCalendar
          testID={testIDs.expandableCalendar.CONTAINER}
          renderHeader={renderHeader}
          ref={calendarRef}
          onCalendarToggled={onCalendarToggled}
          // horizontal={false}
          // hideArrows
          // disablePan
          // hideKnob
          // initialPosition={ExpandableCalendar.positions.OPEN}
          // calendarStyle={styles.calendar}
          // headerStyle={styles.header} // for horizontal only
          // disableWeekScroll
          theme={theme.current}
          // disableAllTouchEventsForDisabledDays
          firstDay={1}
          markedDates={marked.current}
          leftArrowImageSource={leftArrowIcon}
          rightArrowImageSource={rightArrowIcon}
          // animateScroll
          // closeOnDayPress={false}
        />
      )}
      <AgendaList
        sections={ITEMS}
        renderItem={renderItem}
        // scrollToNextEvent
        sectionStyle={styles.section}
        // dayFormat={'yyyy-MM-d'}
      />
      <MonthYearPicker
        visible={pickerVisible}
        initialDate={new XDateClass(providerDate)}
        onClose={() => setPickerVisible(false)}
        onConfirm={(monthIndex: number, year: number) => {
          const month = (monthIndex + 1).toString().padStart(2, '0');
          const newDateString = `${year}-${month}-01`;
          setPickerVisible(false);
          setProviderDate(newDateString);
        }}
      />
    </CalendarProvider>
  );
};

export default ExpandableCalendarScreen;

const styles = StyleSheet.create({
  calendar: {
    paddingLeft: 20,
    paddingRight: 20
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10
  },
  headerTitle: {fontSize: 16, fontWeight: 'bold', marginRight: 6},
  section: {
    backgroundColor: lightThemeColor,
    color: 'grey',
    textTransform: 'capitalize'
  }
});
