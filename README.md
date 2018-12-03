A Rails backend for _Subtle_

  Client URL - https://limitless-sands-48235.herokuapp.com

  API URL - https://murmuring-oasis-50773.herokuapp.com/api/v1



Project Description

  Subtle is a social networking app akin to pintrest that uses a Ruby on Rails API and a React/Redux front end interface. It uses AWS for image storage and is live on Heroku.

  As a user, you can make channels which have a title.

  A channel is comprised of many blocks. Blocks can contain uploaded images and a description. A user can add blocks from other channels to channels they have made, meaning a block can belong to many channels.  A user can also comment on a block.

  If a channel is public anyone can contribute blocks to it. If it is private, only the author of the channel can add blocks.

  If you find a channel that you like, you can follow it and it gets added to your "followed channels" list that visible in your profile page

  You can add or remove friends on the site. You can also edit your profile and upload a new profile picture.

  The home page is a feed page which randomly fetches a user's friends' activity.
  **Still needs to be buffed out in terms of logic, but will still fetch randomized data from your friend's activities!**

Tech Specs
  Subtle uses AWS S3 by way of Active Storage to store uploaded pictures for blocks and user profiles.

  The backend uses 'Shallow Serializers' to render nested data with more specific information.
    i.e - It makes it possible to see a user's friend's channel's block's image. Where as, by default, the serializer would give just the block's ID for a channel, if anything at all, rather than more specific information.

  Fully functional AUTH using JWT tokens generated by the backend and saved to the front end in localstorage. Allowing a user to close the page and come back as long as they don't quit their browser. It also fetches the relevant information of the url you're trying to go to if you have access to it. 
    i.e you can reload on a friend's page and if you're logged in it will render with a that friend's information.
