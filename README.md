https://jira.devfactory.com/browse/OCE-15618 - Prepare and test event data migration - mapping all items - so should have been done here
- no new ACs - 

- so this was a split - of the FS - rules for FSEM creating stories - new acs - but why isn't this written down



split to - https://jira.devfactory.com/browse/OCE-15912 - split HBase tables with time slices/paging and create export files - should have been mapped to TDD 4.2.1 - split from scope of https://jira.devfactory.com/browse/OCE-15618
no pr expcetion - was done as part of original story



OCE-15967 - As a user I want to import the data from Google Bucket to BigTable - this split would have been - 
TDD 4.2.5
Create a Writer based on BigtableIO.

BG 1	3. a. x. Google Dataflow is used to migrate and transform events from HBase to Bigtable. P2 ITD 10
**P2 ITD 10	Use Google Dataflow to migrate and transform events from HBase to Bigtable

TDD 4.1.1	TDD 4.1.2	TDD 4.1.3	TDD 4.1.4	TDD 4.1.5	TDD 4.1.6	TDD 4.1.7	TDD 4.1.8	TDD 4.1.9

- so what is the reason - spec change -

OCE-15967, OCE-15917 - could be technical gap - Google Cloud Bucket in the original AU


OCE-15917 - As a user I need event data to be exported to a Google Cloud Bucket'
-no pr - part of 618

BG 1	3. vii. Updates made on the source before the segment is migrated are flushed to HBase and then migrated by Dataflow to Bigtable. P1 ITD 6.1
P1 ITD 6.1	Updates made on the source before the segment is migrated have to be flushed to HBase and then migrated by Dataflow to Bigtable




TDD 4x is about UnifiedCharging Subscribers -> Beam pipelines

mapped to TDD 4.2.5
OCE-15617	Prepare and test events logs migration
OCE-15618	Prepare and test event data migration
OCE-15619	Parallelize event data migration




OCE-15620	Log record counts for event data migration
OCE-15621	Create a post-check script to validate events migration


so it reads from hbase - to bucket - fo bucket to bigtable




3 fses acccepted by my, not tdd, all implemented as part of OCE-15618 - no PR exception, all technical



- the rules for new FSes - new ACs- in this case none - when FS can split - since this is a split - need SPEC clarification