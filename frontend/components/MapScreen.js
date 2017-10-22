import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapView from 'react-native-maps';
import { StackNavigator } from 'react-navigation';
import PushDown from '../common/PushDown';
import Placeholder from '../common/Placeholder';
import Button from '../common/Button';
import commonStyles from '../styles/commonStyles';
import colors from '../styles/colors';
import Spinner from '../common/Spinner';


export default class MapScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);

    this.state = {
      initialLat: 0,
      initialLon: 0,
      region: {
        latitude: 37.427,
        longitude: -122.170,
        latitudeDelta: 0.1,
        longitudeDelta: 0.04,
      },
      coords: [],
    };
    //Firebase configuration
    // const config = {
    //   something
    // };
    this.onRegionChange = this.onRegionChange.bind(this)
  }

  componentDidMount() {
    console.log("USER" + this.props.navigation.state.params.username);
    this.correctLocInterval = setInterval(this.update.bind(this), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.correctLocInterval);
  }

  setAllCoords() {
    // Post to server
    const loginRoute = `http://10.21.153.16:3000/checkins/coords`;
    fetch(loginRoute, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    }).then((response) => {
      console.log(response);
      if (response.ok === true) {
        return response.json();
      } else {
        console.error(response);
      }
    }).then((json) => {
      // console.log(json);
      this.setState({ coords: json })
    }).catch((error) => {
      console.error(error);
    });
  }

  update() {
    this.setPos();
    this.setAllCoords();
    console.log('updated');
  }

  onRegionChange(region) {
      this.setState({ region: region })
  }

  setPos() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({region: {
          latitude: this.state.region.latitude,
          longitude: this.state.region.longitude,
          latitudeDelta: this.state.region.latitudeDelta,
          longitudeDelta: this.state.region.longitudeDelta,
        }});
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
  }
  renderCircles() {
    //TODO: get the right array of circle numbers
    const circleList = [[37.43, -122.174, 800, 3], [37.42, -122.08, 1400, 2], [37.49, -122.28, 4000, 3], [37.496, -122.2, 2500, 2], [37.38, -122.154, 1900, 1], [37.35, -122.13, 5000, 1], ]
    var circles = []
    var circleColor1 = colors.circleColor1;
    var circleColor2 = colors.circleColor2;
    var circleColor3 = colors.circleColor3;
    for (var i = 0; i < circleList.length; i++) {
      circle = circleList[i];
      var col = "circleColor" + circle[3];
      circles.push(
        <MapView.Circle
          center={{
            latitude: circle[0],
            longitude: circle[1]
          }}
          radius={circle[2]}
          fillColor={eval(col)}
          strokeColor={eval(col)}
        />
      )
    }
    return circles;
  }

  renderPins() {
    console.log(this.state.coords)
    return this.state.coords.map((coord) => {
      return (
        <MapView.Marker
          coordinate={{
            latitude: coord[0],
            longitude: coord[1],
          }}
        />
      )
    });
  }

  renderMap() {
    return (
      <MapView
        provider="google"
        style={commonStyles.map}
        showsUserLocation
        region={this.state.region}
        onRegionChange={this.onRegionChange}
      >
        {this.renderCircles()}
        {this.renderPins()}
      </MapView>
    );
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={commonStyles.viewStyle}>
        <PushDown />
        <Placeholder flex={0.5}>
          <Text style={commonStyles.mainTextStyle}>Health concerns around you</Text>
        </Placeholder>
        <Placeholder>
          {this.renderMap()}
        </Placeholder>
        <Placeholder>
          <Button
            onPress={() => navigate('FeelScreen', { username: this.props.navigation.state.params.username })}
            title='Check In'
            main
          />
        </Placeholder>
        <Placeholder flex={0.5}>
          <Text style={commonStyles.smallTextStyle}>Yellow - 1-5% of users report unusual symptoms</Text>
          <Text style={commonStyles.smallTextStyle}>Orange - 5-10% of users report unusual symptoms</Text>
          <Text style={commonStyles.smallTextStyle}>Red - 10%+ of users report unusual symptoms</Text>
        </Placeholder>
      </View>
    );
  }
}
