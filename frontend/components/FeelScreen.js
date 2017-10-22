import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import PushDown from '../common/PushDown';
import Placeholder from '../common/Placeholder';
import Button from '../common/Button';
import commonStyles from '../styles/commonStyles';
import colors from '../styles/colors';

export default class FeelScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(e) {
    this.setState({})
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <ScrollView contentContainerStyle={commonStyles.viewStyle}>
        <PushDown />
        <Placeholder flex={0.5} />
        <Placeholder>
          <Text style={commonStyles.mainTextStyle}>Would you like to report any symptoms?</Text>
        </Placeholder>
        <Placeholder>
         <Button
            onPress={() =>
              navigate('SymptomScreen', { username: this.props.navigation.state.params.username })
            }
            title='Report Symptoms'
            main
          />
        </Placeholder>
        <Placeholder>
          <Button
            onPress={() =>
              navigate('MapScreen', { username: this.props.navigation.state.params.username })
            }
            title='Cancel'
            main
          />
        </Placeholder>
        <Placeholder flex={0.3} />
      </ScrollView>
    );
  }
}
