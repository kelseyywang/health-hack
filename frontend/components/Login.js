import React from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback, Keyboard, Image } from 'react-native';
import PushDown from '../common/PushDown';
import { StackNavigator } from 'react-navigation';
import Placeholder from '../common/Placeholder';
import Button from '../common/Button';
import Spinner from '../common/Spinner';
import commonstyles from '../styles/commonstyles';
import colors from '../styles/colors';
import { Input } from '../common';


export default class SymptomScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      error: '',
      loading: false,
      loggedIn: false,
    };
  }

  onButtonPress() {
    const { navigate } = this.props.navigation;
    const {email, password} = this.state;
    this.setState({ error: '', loading: true });
    navigate('MapScreen', {username: this.state.email});
  }

  resetForm() {
    this.setState({
      email: '',
      password: '',
      loading: false,
      error: ''
    });
  }

renderButton() {
  if (this.state.loading) {
    return <Spinner size="small" />;
  }
  return (
    <Button
      onPress={this.onButtonPress.bind(this)}
      title='Log In'
      main
    />
  );
}

renderForm() {
  return (
    <View style={commonstyles.viewStyle}>
      <PushDown />
      <Placeholder flex={.6} />
      <Placeholder>
        <Image
          style={styles.logoStyle}
          source={require('../images/logo.png')}
        />
      </Placeholder>
      <Placeholder
        noJustify
        flex={1.5}
      >
        <Input
          placeholder="user"
          label="Username"
          value={this.state.email}
          onChangeText={email => this.setState({ email })}
          keyboardType='email-address'
        >
        </Input>

        <Input
          secureTextEntry
          placeholder="password"
          value={this.state.password}
          onChangeText={password => this.setState({ password })}
          label="Password"
        />
    </Placeholder>
      <Placeholder>
        <Text style={commonstyles.errorTextStyle}>
          {this.state.error}
        </Text>
        {this.renderButton()}
      </Placeholder>
      <Placeholder />
    </View>
  );
}

render() {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={commonstyles.viewStyle}>
        {this.renderForm()}
      </View>
    </TouchableWithoutFeedback>
  );
}
}

const styles = {
  logoStyle: {
    height: 84,
    width: 100,
  },
};