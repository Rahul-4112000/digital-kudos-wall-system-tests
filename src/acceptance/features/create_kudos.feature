@skip
Feature: Create Kudos
  As a user
  I want to create kudos
  So that I can give kudos to team members

  Rule: Team Leads can create kudos

    Background:
      Given a user must be logged in
      And create kudos service is available


    @ui
    Scenario: Successful kudos creation
      When a team lead creates a kudos for a team member:
        | Category       | Team Member | Message         |
        | Brilliant Idea | Kevin Smith | Testing message |
      Then the kudos should be created with success message "Kudos created successfully for Kevin Smith!"
