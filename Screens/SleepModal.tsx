import React, { useState, useEffect } from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import NumberBox from './Numberbox';
import SleepQualitySelector from './SleepQualitySelector';

type SleepModalProps = {
  visible: boolean;
  onClose: () => void;
  onSubmit: (nap: { start: string; end: string; sleepQuality: number }) => void; // add this
  defaultData?: { start: string; end: string } | null; // optional initial data for editing
};

const SleepModal: React.FC<SleepModalProps> = ({ visible, onClose, onSubmit, defaultData = null }) => {
  const [fromQuantity, setFromQuantity] = useState(0);
  const [toQuantity, setToQuantity] = useState(0);
  const [sleepQualityN, setSleepQualityN] = useState<number>(0);

  const [fromPeriod, setFromPeriod] = useState<'AM' | 'PM'>('AM');
  const [toPeriod, setToPeriod] = useState<'AM' | 'PM'>('AM');

  useEffect(() => {
    if (defaultData) {
      // parse start time
      const startParsed = parseTimeString(defaultData.start);
      setFromQuantity(startParsed.hour);
      setFromPeriod(startParsed.period);

      // parse end time
      const endParsed = parseTimeString(defaultData.end);
      setToQuantity(endParsed.hour);
      setToPeriod(endParsed.period);
    }
  }, [defaultData]);

  const parseTimeString = (timeStr: string) => {
    const [hourStr, period] = timeStr.split(' ');
    return {
      hour: Number(hourStr),
      period: period as 'AM' | 'PM',
    };
  };

  const handleSaveQuantity = (newQuantity: number, option: string) => {
    if (option === 'from') {
      setFromQuantity(newQuantity);
    } else if (option === 'to') {
      setToQuantity(newQuantity);
    }
  };
const handleClose = () => {
  onClose();
};
  const handleSubmit = () => {
    // Construct start/end strings like "8 AM"
    const start = `${fromQuantity} ${fromPeriod}`;
    const end = `${toQuantity} ${toPeriod}`;

    // You might want to validate times here before submitting

    onSubmit({
      start,
      end,
      sleepQuality: sleepQualityN,
    });

    onClose(); // Close modal after submit, or omit if you want to keep it open
  };

  const renderPeriodButton = (period: 'AM' | 'PM', selected: boolean, onPress: () => void) => {
    const colors = selected
      ? ['#6B2A88', '#B766DA'] as const
      : ['#D3D3D3', '#A9A9A9'] as const;

    return (
      <TouchableOpacity onPress={onPress}>
        <LinearGradient
          colors={colors}
          start={{ x: -0.05, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradientBox}
        >
          <Text style={styles.periodText}>{period}</Text>
        </LinearGradient>
      </TouchableOpacity>
    );
  };

  return (
    <Modal animationType="fade" transparent visible={visible} onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.container}>
          {/* ...existing UI code... */}

          <View style={{ justifyContent: 'center', flexDirection: 'column', gap: 30, alignItems: 'center' }}>
            <View style={styles.row}>
              <Text style={styles.purpleText}>From</Text>
              <NumberBox option="from" onSave={handleSaveQuantity} initialValue={fromQuantity} />
              <View style={styles.amPmColumn}>
                {renderPeriodButton('AM', fromPeriod === 'AM', () => setFromPeriod('AM'))}
                {renderPeriodButton('PM', fromPeriod === 'PM', () => setFromPeriod('PM'))}
              </View>
            </View>

            <View style={styles.row}>
              <Text style={styles.purpleText}>To</Text>
              <NumberBox option="to" onSave={handleSaveQuantity} initialValue={toQuantity} />
              <View style={styles.amPmColumn}>
                {renderPeriodButton('AM', toPeriod === 'AM', () => setToPeriod('AM'))}
                {renderPeriodButton('PM', toPeriod === 'PM', () => setToPeriod('PM'))}
              </View>
            </View>
          </View>

          <View style={styles.item}>
            <Text style={styles.blackText}>Sleep Quality</Text>
            <SleepQualitySelector
              value={sleepQualityN}
              onChange={setSleepQualityN}
              getEmoji={(level) => {
                const emojis = ['🥱', '😴', '😓', '😟', '😐', '🙂', '😊', '😌', '😍', '🌟'];
                return emojis[level - 1];
              }}
            />
          </View>

          <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
            <Text style={{ color: '#fff' }}>Close</Text>
          </TouchableOpacity>

          {/* NEW SUBMIT BUTTON */}
          <TouchableOpacity onPress={handleSubmit} style={styles.closeButton}>
            <Text style={{ color: '#fff' }}>Submit</Text>
          </TouchableOpacity>

        </View>
      </View>
    </Modal>
  );
};


const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: '#6B2A888C',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    gap: 20,
    backgroundColor: '#F2D6FF',
    padding: 25,
    borderRadius: 15,
    width: '90%',
    flexDirection: 'column',
    alignItems: 'center',
  },
  purpleText: {
    fontSize: 30,
    color: '#6B2A88',
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 20,
  },
  blackText: {
    color: 'black',
    fontWeight: '500',
    fontSize: 24,
    marginBottom: 10,
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: '#6B2A88',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  item: {
    flexDirection: 'column',
    gap: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginTop: 10,
  },
  gradientBox: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
  },
  periodText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    gap: 20,
    alignItems: 'center',
  },
  amPmColumn: {
    flexDirection: 'column',
    gap: 5,
  },
});

export default SleepModal;
