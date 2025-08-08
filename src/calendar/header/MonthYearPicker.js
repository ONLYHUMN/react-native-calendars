import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import XDate from 'xdate';
const ITEM_HEIGHT = 40;
const MonthYearPicker = ({ visible, initialDate, onClose, onConfirm, minYear = 1900, maxYear = 2100 }) => {
    const months = useMemo(() => {
        return Array.from({ length: 12 }, (_, i) => new XDate(2000, i, 1).toString('MMMM'));
    }, []);
    const years = useMemo(() => {
        const start = Math.min(minYear, initialDate.getFullYear());
        const end = Math.max(maxYear, initialDate.getFullYear());
        return Array.from({ length: end - start + 1 }, (_, i) => start + i);
    }, [initialDate, minYear, maxYear]);
    const [selectedMonth, setSelectedMonth] = useState(initialDate.getMonth());
    const [selectedYear, setSelectedYear] = useState(initialDate.getFullYear());
    const monthList = useRef(null);
    const yearList = useRef(null);
    useEffect(() => {
        setSelectedMonth(initialDate.getMonth());
        setSelectedYear(initialDate.getFullYear());
        // Scroll to initial indices when opened
        if (visible) {
            setTimeout(() => {
                monthList.current?.scrollToIndex({ index: initialDate.getMonth(), animated: false });
                const yearIndex = years.indexOf(initialDate.getFullYear());
                if (yearIndex >= 0) {
                    yearList.current?.scrollToIndex({ index: yearIndex, animated: false });
                }
            }, 0);
        }
    }, [visible, initialDate, years]);
    const renderItem = (item, isSelected) => {
        return (<View style={[styles.item, isSelected && styles.itemSelected]}> 
        <Text style={[styles.itemText, isSelected && styles.itemTextSelected]} numberOfLines={1}>
          {String(item)}
        </Text>
      </View>);
    };
    return (<Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.backdrop}>
        <View style={styles.container}>
          <Text style={styles.title}>Select month and year</Text>
          <View style={styles.pickersRow}>
            <FlatList ref={monthList} data={months} keyExtractor={(_, idx) => `m-${idx}`} renderItem={({ item, index }) => (<TouchableOpacity onPress={() => setSelectedMonth(index)}>
                  {renderItem(item, index === selectedMonth)}
                </TouchableOpacity>)} getItemLayout={(_, index) => ({ length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index })} showsVerticalScrollIndicator={false} style={styles.list}/>
            <FlatList ref={yearList} data={years} keyExtractor={(item) => `y-${item}`} renderItem={({ item }) => (<TouchableOpacity onPress={() => setSelectedYear(item)}>
                  {renderItem(item, item === selectedYear)}
                </TouchableOpacity>)} getItemLayout={(_, index) => ({ length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index })} showsVerticalScrollIndicator={false} style={styles.list}/>
          </View>
          <View style={styles.actionsRow}>
            <TouchableOpacity onPress={onClose} style={[styles.button, styles.cancelButton]}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onConfirm(selectedMonth, selectedYear)} style={[styles.button, styles.confirmButton]}>
              <Text style={[styles.buttonText, styles.confirmText]}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>);
};
const styles = StyleSheet.create({
    backdrop: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.4)',
        alignItems: 'center',
        justifyContent: 'center'
    },
    container: {
        width: '85%',
        borderRadius: 12,
        backgroundColor: 'white',
        paddingVertical: 14,
        paddingHorizontal: 12
    },
    title: {
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'center',
        marginBottom: 8
    },
    pickersRow: {
        flexDirection: 'row',
        alignItems: 'stretch',
        justifyContent: 'space-between'
    },
    list: {
        flex: 1,
        maxHeight: ITEM_HEIGHT * 6
    },
    item: {
        height: ITEM_HEIGHT,
        alignItems: 'center',
        justifyContent: 'center'
    },
    itemSelected: {
        backgroundColor: 'rgba(0,0,0,0.06)',
        borderRadius: 8
    },
    itemText: {
        fontSize: 16
    },
    itemTextSelected: {
        fontWeight: '600'
    },
    actionsRow: {
        marginTop: 12,
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    button: {
        paddingVertical: 10,
        paddingHorizontal: 14,
        borderRadius: 8
    },
    cancelButton: {
        backgroundColor: 'transparent'
    },
    confirmButton: {
        backgroundColor: '#1976D2',
        marginLeft: 8
    },
    buttonText: {
        fontSize: 15
    },
    confirmText: {
        color: 'white',
        fontWeight: '600'
    }
});
export default MonthYearPicker;
