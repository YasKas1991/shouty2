Feature: Feature name

   Shouty allowScenario Outline: Allows users to hear shouts from other users as long as they are in range.

   Rule: Shouts can be heard by all within range.

   Scenario: Listener is within range of shout
      Given the range is 100
      And Sean is located at 0
      And Lucy is located 50
      When Sean shouts:
            | Hello |
            | World |
            |From Mars|
      Then Lucy hears Sean's shout

      Rule: Only shouts within a certain range should be heard.

      Scenario: Listener is not within range of shout

      Given the range is 100
      And Sean is located at 0
      And Lucy is located 150
      When Sean shouts "Hello"
      Then Lucy does not hear Sean's shout


      Rule: Must be less than the maximum character lenght.

      Scenario: Message is too long

      Given the maximum character length is 140
      When Sean shouts,
      """This is a really long message
      so long in fact that I am not going to
      be allowed to send it, at least if I keep
      typing like this until the length is over
      the limit of 180 characters."""

     Then Lucy does not hear Sean's shout

      And an error message is recieved that states "Message too long"




