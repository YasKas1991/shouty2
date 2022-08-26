Feature: Feature name

   Shouty allowScenario Outline: Allows users to hear shouts from other users as long as they are in range.

   Rule: Shouts can be heard by all within range.

   Scenario: Listener is within range of shout
      Given the range is 100
      And Sean is located at 0
      And Lucy is located 50
      When Sean shouts "hello"
      Then Lucy hears Sean's shout



