Timeline component  
[(code example)](https://github.com/wix/react-native-calendars/blob/master/example/src/screens/timelineCalendarScreen.tsx)
:::info
This component extends **[ScrollView](https://reactnative.dev/docs/scrollview)** props.
:::
<div style={{display: 'flex', flexDirection: 'row', overflowX: 'auto', maxHeight: '500px', alignItems: 'center'}}><img style={{maxHeight: '420px'}} src={'https://github.com/wix/react-native-calendars/blob/master/demo/assets/timeline-calendar.gif?raw=true'}/>

</div>

## API
### date
The date / dates of this timeline instance in ISO format (e.g. 2011-10-25)  
<span style={{color: 'grey'}}>string | string[]</span>

### events
List of events to render on the timeline  
<span style={{color: 'grey'}}>Event[]</span>

### start
The timeline day start time  
<span style={{color: 'grey'}}>number</span>

### end
The timeline day end time  
<span style={{color: 'grey'}}>number</span>

### onEventPress
Handler which gets executed when event is pressed  
<span style={{color: 'grey'}}>(event: Event) => void</span>

### onBackgroundLongPress
Handler which gets executed when background is long pressed. Pass to handle creation of a new event  
<span style={{color: 'grey'}}>(timeString: string, time: NewEventTime) => void</span>

### onBackgroundLongPressOut
Handler which gets executed when background's long pressed released. Pass to handle creation of a new event  
<span style={{color: 'grey'}}>(timeString: string, time: NewEventTime) => void</span>

### theme
Specify theme properties to override specific styles for calendar parts  
<span style={{color: 'grey'}}>Theme</span>

### scrollToFirst
Whether to scroll to the first event  
<span style={{color: 'grey'}}>boolean</span>

### scrollToNow
Whether to scroll to the current time on first render  
<span style={{color: 'grey'}}>boolean</span>

### initialTime
The initial time to scroll to when the timeline is first rendered  
<span style={{color: 'grey'}}>NewEventTime</span>

### format24h
Whether to use 24 hours format for the timeline hours  
<span style={{color: 'grey'}}>boolean</span>

### renderEvent
Specify a custom event block  
<span style={{color: 'grey'}}>(event: PackedEvent) => JSX.Element</span>

### showNowIndicator
Whether to show the now indicator  
<span style={{color: 'grey'}}>boolean</span>

### scrollOffset
A scroll offset value that the timeline will sync with  
<span style={{color: 'grey'}}>number</span>

### onChangeOffset
Listen to onScroll event of the timeline component  
<span style={{color: 'grey'}}>(offset: number) => void</span>

### overlapEventsSpacing
Spacing between overlapping events  
<span style={{color: 'grey'}}>number</span>

### rightEdgeSpacing
Spacing to keep at the right edge (for background press)  
<span style={{color: 'grey'}}>number</span>

### unavailableHours
Range of available hours  
<span style={{color: 'grey'}}>UnavailableHours[]</span>

### unavailableHoursColor
Background color for unavailable hours  
<span style={{color: 'grey'}}>string</span>

### numberOfDays
The number of days to present in the timeline calendar  
<span style={{color: 'grey'}}>number</span>

### timelineLeftInset
The left inset of the timeline calendar (sidebar width)  
<span style={{color: 'grey'}}>number</span>

### testID
Identifier for testing  
<span style={{color: 'grey'}}>string</span>

