import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, ScrollView, ActivityIndicator, Image} from 'react-native';
import axios from 'axios';

export default class App extends React.Component
{

  constructor(props)
  {
    super(props);
    this.state = {articles: [], isLoading: true};
  }

  componentWillMount()
  {
    axios.get("http://newsapi.org/v2/top-headlines", {
      params: {
        country: 'US'
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'X-Api-Key': '067012cb1f68496fae10664290fa28bc',
        'accept': 'application/json'
      }
    }).then(response => {
      console.log(response)
      this.setState({articles: response.data.articles, isLoading: false});
    }).catch(err => {
      console.log(err);
    })
  }


  renderArticles = () => {

    let articlesComponents = [];

    for(let i = 0; i < this.state.articles.length; i++)
    {
      let article = this.state.articles[i];
      articlesComponents.push(
        <View key={"article-" + i} style={{flexDirection: 'row', flex: 1, borderBottomColor: 'black', borderBottomWidth: 1, paddingVertical: 5}}>
          <Image source={{uri: article.urlToImage}} resizeMode="cover" style={{width: 100, height: '100%', marginRight: 10, alignSelf: 'center'}}/>
          <View style={{flexDirection: 'column', flex: 1}}>
            <Text style={{fontSize: 16, fontWeight: 'bold', color: 'black'}}>{article.title}</Text>
            <Text style={{fontSize: 12}}>{article.description}</Text>
            <Text style={{fontSize: 10, alignSelf: 'flex-end', marginRight: 5}}>{article.author}</Text>
          </View>
        </View>
      );
    }

    return articlesComponents;


  }



  render() 
  {
    if(this.state.isLoading)
    {
      return(
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" />
        </View>
      )
    }

    return (
      <ScrollView style={styles.container}>
        {this.renderArticles()}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }

});
