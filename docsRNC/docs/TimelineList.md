TimelineList component  
[(code example)](https://github.com/wix/react-native-calendars/blob/1.1311.1/example/src/screens/timelineCalendarScreen.tsx)
:::info
This component extends **[InfiniteList](https://github.com/wix/react-native-calendars/blob/1.1311.1/src/infinite-list/index.tsx)** props.
:::
<div style={{display: 'flex', flexDirection: 'row', overflowX: 'auto', maxHeight: '500px', alignItems: 'center'}}><img style={{maxHeight: '420px'}} src={'https://github.com/wix/react-native-calendars/blob/master/demo/assets/timeline-calendar.gif?raw=true'}/>

</div>

## API
### events
Map of all timeline events ({[date]: events})  
<span style={{color: 'grey'}}>{[date: string]: TimelineProps['events']}</span>

### timelineProps
General timeline props to pass to each timeline item  
<span style={{color: 'grey'}}>Omit<TimelineProps, 'events' | 'scrollToFirst' | 'showNowIndicator' | 'scrollToNow' | 'initialTime'></span>

### renderItem
Pass to render a custom Timeline item  
<span style={{color: 'grey'}}>(timelineProps: TimelineProps, info: TimelineListRenderItemInfo) => JSX.Element</span>

### scrollToFirst
Should scroll to first event of the day  
<span style={{color: 'grey'}}>boolean</span>

### showNowIndicator
Should show now indicator (shown only on 'today' timeline)  
<span style={{color: 'grey'}}>boolean</span>

### scrollToNow
Should initially scroll to current time (relevant only for 'today' timeline)  
<span style={{color: 'grey'}}>boolean</span>

### initialTime
Should initially scroll to a specific time (relevant only for NOT 'today' timelines)  
<span style={{color: 'grey'}}>TimelineProps['initialTime']</span>

