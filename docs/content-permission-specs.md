# Functional Specification: Content Access and Permission System

### 1. Overview

This document specifies the logic for controlling user access to `Content Nodes` within the system. The primary goal is to provide a robust, flexible, and efficient permission model that supports both direct and inherited permissions through a hierarchical content structure.

The system determines a user's final access rights—their **Effective Permission**—by evaluating a set of rules in a specific order. This calculated permission is stored for fast lookups, ensuring the system remains performant.

### 2. Core Concepts

* **Content Node:** The fundamental unit of content (e.g., a `MODULE`, `LESSON`, `ARTICLE`). All content is represented as a `Content Node`.
* **Permission Level:** A specific level of access a user can have. These levels are hierarchical:
    * `VIEW`: The user can see the content.
    * `INTERACT`: The user can view and engage with interactive elements.
    * `EDIT`: The user can modify the content.
    * `MANAGE`: The user can edit content and manage permissions for it.
    * `OWNER`: The user has full control.
* **Explicit Permission:** A permission that is directly granted on a specific `Content Node`. It can be granted to an individual `User` or to a `Permission Group`. This is the ultimate source of truth for all permission calculations.
* **Effective Permission:** The actual, final permission level a user has for a given `Content Node`. It is the result of a calculation that considers all rules, including explicit grants, group memberships, and inheritance. This is what the system checks to allow or deny an action.
* **Hierarchy & Inheritance:** `Content Nodes` can be linked to form a parent-child hierarchy (e.g., a `MODULE` is a parent to several `LESSON` nodes). By default, a child node automatically **inherits** the `Effective Permission` of its parent.
* **Permission Override:** If a `Content Node` has an `Explicit Permission` set on it, that permission takes precedence and **overrides** any permission it would have inherited from its parent. This node then becomes the new source of permissions for its own descendants.

### 3. Permission Calculation Logic

To determine a user's `Effective Permission` for a given `Content Node` (let's call it the "Target Node"), the system executes the following steps in order:

#### 3.1. Step 1: Check for a Direct Permission Override

The system first checks if the Target Node has an `Explicit Permission` granted that applies to the user.

* **Direct User Grant:** Does an `Explicit Permission` exist on the Target Node for the user's specific ID?
* **Group Grant:** Is the user a member of a `Permission Group` that has been granted an `Explicit Permission` on the Target Node?

If one or more such permissions exist, the system takes the **highest** permission level among them. This level becomes the user's `Effective Permission` for the Target Node. **The calculation stops here.**

#### 3.2. Step 2: Determine Permission by Inheritance

If Step 1 does not find any `Explicit Permission` on the Target Node, the system attempts to inherit permission from its parent.

* The system travels **up** the content hierarchy from the Target Node, one parent at a time.
* It checks each ancestor node to see if it has an `Explicit Permission` for the user (either directly or via a group).
* The system stops at the **first ancestor** it finds that has such an `Explicit Permission`. The `Effective Permission` of this ancestor becomes the `Effective Permission` for the original Target Node. **The calculation stops here.**

#### 3.3. Step 3: Check for Public Access

If the system completes Step 2 without finding any `Explicit Permission` on the Target Node or in its entire ancestral chain, it performs a final check:

* Is the `isPublic` flag on the Target Node set to `true`?
* If yes, the user is granted a default `Effective Permission` of `VIEW`. **The calculation stops here.**

#### 3.4. Step 4: No Access

If none of the steps above result in a permission level, the user has no access to the `Content Node`. Their `Effective Permission` is considered `NULL`.

### 4. Permission Propagation Down the Hierarchy

A change in a node's permission must "ripple down" to its descendants.

When the `Effective Permission` for a `Content Node` (the "Source Node") is established or changed, this new permission is propagated down to its children, grandchildren, and so on.

* **Propagation Rule:** The `Effective Permission` of the Source Node is applied to all of its descendants.
* **Stopping Condition:** This propagation automatically halts down any branch of the hierarchy at the point where a descendant has its own `Explicit Permission`. That descendant and its sub-tree will follow their own permission rules, ignoring the change from the ancestor.

### 5. Triggering Events for Recalculation

The system automatically recalculates and updates `Effective Permissions` whenever a relevant change occurs. This ensures that the stored permissions are always accurate. The key triggering events are:

* **An `ExplicitPermission` is Created, Updated, or Deleted:** This is the most direct trigger. The system recalculates permissions for the affected user(s) and the entire subtree rooted at the specified `Content Node`.
* **A User is Added to or Removed from a `PermissionGroup`:** When a user's group membership changes, the system must re-evaluate their permissions for all `Content Nodes` where that group has been granted access.
* **A `ContentLink` defining a parent-child relationship is Created or Deleted:** Changing the hierarchy can change which parent a node inherits from. The system must recalculate permissions for the entire subtree of the child node whose link was modified.
* **The `isPublic` flag on a `ContentNode` is changed:** If a node becomes public, users might gain `VIEW` access. If it becomes private, that access must be revoked (unless another rule grants them permission). This triggers a recalculation for affected users.

### 6. System State Management

* The `EffectivePermission` table acts as a persistent cache or a materialized view of the results from the permission calculation logic.
* Its purpose is to provide immediate, high-performance access to a user's final permissions without needing to run the complex calculation logic on every single request.
* Automated triggers ensure this table is kept in a consistent state with the source-of-truth tables (`ExplicitPermission`, `GroupMember`, `ContentLink`).