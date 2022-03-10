import React from 'react';
import { Text, View } from 'react-native';
import styles from './styles/style';

export default function Header() {
  return (
    <View style={styles.footer}>
      <Text style={styles.author}>Author: Juho Vikman</Text>
    </View>
  );
}